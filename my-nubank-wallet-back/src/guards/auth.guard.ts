import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken((authorization ?? "").split(" ")[1]);
      const cpf = await this.authService.getSessionByToken((authorization ?? "").split(" ")[1]);
      request.cpf = cpf;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;

  }

}