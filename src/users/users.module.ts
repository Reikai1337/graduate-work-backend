import { Role } from "src/roles/role.entity";
import { RolesService } from "src/roles/roles.service";

import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, JwtService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
