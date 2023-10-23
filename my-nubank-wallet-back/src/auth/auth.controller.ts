import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/auth.dto';

@Controller('')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    @Post("sign-in")
    signIn(@Body() signInUserDto: SignInUserDto){
        return this.AuthService.login(signInUserDto)
    }

}