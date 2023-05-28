// import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { getAuthData } from "./utils";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  private async verifyUser(userDto: LoginDto) {
    const user = await this.usersService.getByLogin(userDto.login, true);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);

    if (passwordEqual) return user;

    throw new UnauthorizedException({
      message: "Incorrect login or password",
    });
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  async login(userDto: LoginDto) {
    const user = await this.verifyUser(userDto);
    const token = await this.generateToken(user);

    delete user.password;

    return {
      user,
      token,
    };
  }

  async verify(authorization?: string) {
    try {
      const { bearer, token } = getAuthData(authorization);

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User is not authorized" });
      }

      const user = this.jwtService.verify<User>(token);

      return this.usersService.getById(user.id);
    } catch (e) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.usersService.getByLogin(userDto.login);
    if (candidate) {
      throw new HttpException(
        "User with this login already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    const token = await this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async checkInitialAdmin() {
    const users = await this.usersService.getAllUsers();
    return Boolean(users.length);
  }
}
