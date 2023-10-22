import { IsString, IsStrongPassword, Length } from "class-validator"

export class SignInUserDto{
    @IsString()
    @Length(11,11)
    cpf:string
    @IsString()
    @Length(8)
    password:string
}