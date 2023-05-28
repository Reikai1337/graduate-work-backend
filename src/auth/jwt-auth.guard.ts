import { Observable } from "rxjs";
import { User } from "src/users/user.entity";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { RequestWithUser } from "./types";
import { getAuthData } from "./utils";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();

    try {
      const { bearer, token } = getAuthData(req.headers.authorization);

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.jwtService.verify<User>(token);
      req.user = user;

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}
