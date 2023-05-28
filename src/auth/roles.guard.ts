import { Observable } from "rxjs";
import { User } from "src/users/user.entity";

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

import { ROLES_KEY } from "./roles-auth.decorator";
import { RequestWithUser } from "./types";
import { getAuthData } from "./utils";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );
      if (!requiredRoles) return true;

      const req = context.switchToHttp().getRequest<RequestWithUser>();
      const { bearer, token } = getAuthData(req.headers.authorization);

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.jwtService.verify<User>(token, {
        secret: process.env.SECRET_KEY || "secret",
      });
      req.user = user;
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (error) {
      throw new HttpException("No access", HttpStatus.FORBIDDEN);
    }
  }
}
