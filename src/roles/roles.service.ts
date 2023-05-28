import { Repository } from "typeorm";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async create(dto: CreateRoleDto) {
    if (!dto.name) {
      throw new HttpException("Name is required", HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleRepository.findOne({
      where: {
        value: dto.name,
      },
    });

    if (role) {
      throw new HttpException(
        "This role already exists",
        HttpStatus.BAD_REQUEST
      );
    }

    return this.roleRepository.save({
      value: dto.name,
    });
  }

  // async createInitialRoles() {
  //   const initialRoles = await Promise.all([
  //     this.roleRepository.save({
  //       value: "Admin",
  //     }),
  //     this.roleRepository.save({
  //       value: "Manager",
  //     }),
  //     this.roleRepository.save({
  //       value: "User",
  //     }),
  //   ]);

  //   return initialRoles;
  // }

  async getByValue(value: string) {
    return this.roleRepository.findOne({
      where: { value },
    });
  }

  async getAll() {
    return this.roleRepository.find();
  }
}
