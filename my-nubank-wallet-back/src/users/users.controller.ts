import { Controller, Get, UseGuards } from '@nestjs/common';
import { Sessions as SessionPrisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './users.service';
import { request } from 'express';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    

    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(){
        const {cpf}:any = request
        console.log(cpf)
        return this.usersService.getUser(cpf);
    }
}
