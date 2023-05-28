import { JwtService } from "@nestjs/jwt";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, JwtService],
  exports: [RolesService],
})
export class RolesModule {}
