import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUser(cpf:string) {
        throw new Error('Method not implemented.');
    }
}
