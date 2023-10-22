import { Injectable } from '@nestjs/common';
import { SignInUserDto } from './dto/auth.dto';
import { NubankApi } from 'nubank-api';
import { v4 as uuidv4 } from 'uuid';
import { createInterface } from 'readline';
import * as qrCodeTerminal from 'qrcode-terminal';

@Injectable()
export class AuthService {
  private AUTH_CODE: string = uuidv4();

  constructor() {}

  async login(signInUser: SignInUserDto) {
    const api = new NubankApi();

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const qrCodeData = `${this.AUTH_CODE}`;
    
    qrCodeTerminal.generate(qrCodeData);

    rl.question('Press Enter after scanning the QR code in the Nubank app.', async () => {
      try {
        await api.auth.authenticateWithQrCode(signInUser.cpf, signInUser.password, this.AUTH_CODE);
        return api.authState
      } catch (e) {
        console.error(e.stack);
      }
    });
  }
}
