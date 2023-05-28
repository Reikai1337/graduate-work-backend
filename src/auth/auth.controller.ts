import { Request } from "express";
import { CreateUserDto } from "src/users/dto/create-user.dto";

import { Body, Controller, Post, Req } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("/verify")
  verify(@Req() req: Request) {
    return this.authService.verify(req.headers.authorization);
  }

  // @Roles("Admin")
  // @UseGuards(RolesGuard)
  @Post("/register")
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  // @Get("check_initil_admin")
  // checkInitialAdmin() {
  //   return this.authService.checkInitialAdmin();
  // }
}
