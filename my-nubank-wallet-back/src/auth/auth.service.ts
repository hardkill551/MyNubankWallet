import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/auth.dto';
import { NubankApi } from 'nubank-api';
import { AuthRepository } from './auth.repository';
import { AuthState } from 'nubank-api/lib/http';
import { Sessions } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly sessionFields = [
    'accessToken',
    'list_cards',
    'bills_summary_list',
    'common_xp',
    'features_map',
    'bills_summary',
    'foundation_tokens',
    'customer',
    'account',
    'app_flows',
    'customer_sessions',
    'userinfo',
    'events',
    'events_page',
  ];
  constructor(private readonly authRepository: AuthRepository, private readonly jwtService: JwtService) {}

   async login(signInUser: SignInUserDto) {
    const api = new NubankApi();
    try {
      await api.auth.authenticateWithQrCode(
        signInUser.cpf,
        signInUser.password,
        signInUser.authCode,
      );
      const sessionsFiltered: Omit<Sessions, 'id'> = this.filterAndStoreFields(
        api.authState,
        signInUser.cpf,
      );
      const session = await this.authRepository.login(sessionsFiltered);
      return session;
    } catch (e) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  private filterAndStoreFields(
    authState: AuthState,
    cpf: string,
  ): Omit<Sessions, 'id'> {
    const filtered: any = {};
    for (const field of this.sessionFields) {
      if (authState.privateUrls[field]) {
        filtered[field] = authState.privateUrls[field].href;
      } else if (field === 'accessToken') {
        filtered[field] = authState[field];
      }
    }
    filtered['cpf'] = cpf;
    return filtered;
  }
  checkToken(token: string) {
    const data = this.jwtService.verify(token);
    console.log(data);
    return data;
  }

  async getSessionByToken(token:string){
    const session = await this.authRepository.getByToken(token)
    if(session.accessToken){
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return session.cpf
    
  }
}
