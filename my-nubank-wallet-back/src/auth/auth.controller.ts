import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/auth.dto';

@Controller('sign-in')
export class AuthController {

    constructor(private readonly AuthService:AuthService){}

    @Post("")
    signIn(@Body() signInUserDto: SignInUserDto){
        return this.AuthService.login(signInUserDto)
    }
}