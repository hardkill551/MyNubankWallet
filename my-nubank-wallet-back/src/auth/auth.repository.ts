import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sessions } from '@prisma/client';

@Injectable()
export class AuthRepository {
  
  constructor(private readonly prisma: PrismaService) {}

  async login(session: Omit<Sessions, 'id'>) {
    await this.prisma.sessions.upsert({
      where: {
        cpf: session.cpf,
      },
      update: session,
      create: session,
    });
    return {token: `Bearer ${session.accessToken}`};
  }


  async getByToken(token: string) {
    return await this.prisma.sessions.findFirst({
      where: {
        accessToken: token,
      },
    })
  }
}
