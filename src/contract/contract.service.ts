import { ProductTypeService } from "src/product-type/product-type.service";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Contract } from "./contract.entity";
import { CreateContractDto } from "./dto/create-contract.dto";

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private productTypeService: ProductTypeService
  ) {}

  async create(dto: CreateContractDto) {
    const productType = await this.productTypeService.getByName(dto.type);
    const user = await this.userRepository.findOne({
      where: {
        id: dto.userId,
      },
    });

    const res = await this.contractRepository.save({
      count: dto.count,
      phone: dto.phone,
      price: dto.price,
      productType,
      user,
    });

    return res;
  }

  async getUserContracts(userId: number) {
    const res = await this.contractRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        productType: true,
      },
    });
    return res;
  }

  async getAllContracts() {
    const res = await this.contractRepository.find({
      order: {
        created_at: "DESC",
      },
      relations: {
        user: true,
        productType: true,
      },
    });
    return res;
  }

  async accept(dto: { id: number; value: boolean }) {
    await this.contractRepository.save({
      id: dto.id,
      accepted: dto.value,
      rejected: !dto.value,
    });

    const res = await this.contractRepository.findOne({
      where: {
        id: dto.id,
      },
      relations: {
        user: true,
        productType: true,
      },
    });
    return res;
  }

  async reject(dto: { id: number; value: boolean }) {
    await this.contractRepository.save({
      id: dto.id,
      accepted: !dto.value,
      rejected: dto.value,
    });

    const res = await this.contractRepository.findOne({
      where: {
        id: dto.id,
      },
      relations: {
        user: true,
        productType: true,
      },
    });
  }
}
