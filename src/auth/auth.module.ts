import { Role } from "src/roles/role.entity";
import { RolesService } from "src/roles/roles.service";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";

import { Module } from "@nestjs/common";
import { JwtModule, JwtSecretRequestType } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || "secret",
      signOptions: {
        expiresIn: "7d",
      },
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          default:
            return process.env.SECRET_KEY || "secret";
        }
      },
    }),

    TypeOrmModule.forFeature([User, Role]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, RolesService],
})
export class AuthModule {}
