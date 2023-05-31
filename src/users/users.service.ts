import { RolesService } from "src/roles/roles.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Repository } from "typeorm";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rolesService: RolesService
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getByLogin(login: string, withError = false) {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
      relations: {
        roles: true,
      },
    });

    if (!user && withError) {
      throw new HttpException(
        "User with this login was not found",
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },

      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException(
        "User with this id was not found",
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    const role = await this.rolesService.getByValue(dto.initialRole);
    const user = await this.userRepository.save({
      email: dto.email,
      lastName: dto.lastName,
      login: dto.login,
      name: dto.name,
      password: dto.password,
      roles: [role],
    });

    return user;
  }
}
