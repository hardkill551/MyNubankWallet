import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/auth.dto';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(signInUser: SignInUserDto) {
    try {
      const res: any = await axios.post(
        'https://prod-global-webapp-proxy.nubank.com.br/api/proxy/AJxL5LBUC2Tx4PB-W6VD1SEIOd2xp14EDQ.aHR0cHM6Ly9wcm9kLWdsb2JhbC1hdXRoLm51YmFuay5jb20uYnIvYXBpL3Rva2Vu',
        {
          password: signInUser.password,
          login: signInUser.cpf,
          grant_type: 'password',
          client_id: 'other.conta',
          client_secret: 'yQPeLzoHuJzlMMSAjC-LgNUJdUecx8XO',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-Id': 'WEB-APP.jO4x1',
            'User-Agent':
              'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
            Origin: 'https://conta.nubank.com.br',
            Referer: 'https://conta.nubank.com.br/',
          },
        },
      );
      await this.prisma.session.create({
        data: {
          token: res.data.access_token,
          listCardsUrl: res.data._links.list_cards.href,
        },
      });

      return `Bearer ${res.data.access_token}`;
    } catch (error) {
      return new UnauthorizedException('Credenciais inválidas');
    }
  }
}
