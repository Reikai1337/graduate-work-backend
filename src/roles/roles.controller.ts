import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}
  // @Roles("Manager", "Admin")
  // @UseGuards(RolesGuard)
  @Get()
  getRoles() {
    return this.rolesService.getAll();
  }

  // @Roles("Manager", "Admin")
  // @UseGuards(RolesGuard)
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.create(dto);
  }
}
