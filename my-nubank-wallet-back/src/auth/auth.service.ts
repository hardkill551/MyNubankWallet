import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/auth.dto';
import { NubankApi } from 'nubank-api';
import { v4 as uuidv4 } from 'uuid';
import { createInterface } from 'readline';
import * as qrCodeTerminal from 'qrcode-terminal';
import { AuthRepository } from './auth.repository';
import { AuthState } from 'nubank-api/lib/http';
import { Sessions } from '@prisma/client';


@Injectable()
export class AuthService {
  private readonly AUTH_CODE: string = uuidv4();
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
  constructor(
    private readonly authRepository: AuthRepository,) {}

  async login(signInUser: SignInUserDto) {
    const api = new NubankApi();
    
    const qrCodeData = `${this.AUTH_CODE}`;
    qrCodeTerminal.generate(qrCodeData);

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const onQRCodeScanned = async () => {
      try {
        await api.auth.authenticateWithQrCode(
          signInUser.cpf,
          signInUser.password,
          this.AUTH_CODE,
        );
        const sessionsFiltered:Omit<Sessions, "id"> = this.filterAndStoreFields(api.authState, signInUser.cpf);
        const session = await this.authRepository.login(sessionsFiltered);
        return session
      } catch (e) {
        console.error(e.stack);
      }
    };

    this.waitForQRCodeScan(rl, onQRCodeScanned);
  }

  private filterAndStoreFields(authState: AuthState, cpf: string): Omit<Sessions, "id">{
    const filtered:any = {};
    for (const field of this.sessionFields) {
      if (authState.privateUrls[field]) {
        filtered[field] = authState.privateUrls[field].href;
      } else if(field === "accessToken"){
        filtered[field] = authState[field];
      }
    }
    filtered['cpf'] = cpf;
    return filtered;
  }

  private async waitForQRCodeScan(rl: any, onScanned: () => Promise<string | UnauthorizedException>) {
    rl.question('Press Enter after scanning the QR code in the Nubank app.', async () => {
      await onScanned();
    });
  }
}
