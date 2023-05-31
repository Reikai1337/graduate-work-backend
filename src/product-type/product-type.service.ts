import { Repository } from "typeorm";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { ProductType } from "./product-type.entity";

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>
  ) {}

  async getByName(name: string) {
    const productType = await this.productTypeRepository.findOne({
      where: { name },
    });

    if (!productType) {
      throw new HttpException("Product type not found", HttpStatus.NOT_FOUND);
    }

    return productType;
  }

  async getAll() {
    const productTypes = await this.productTypeRepository.find({
      where: {
        isIngredient: false,
      },
    });

    return productTypes;
  }

  async getAllIngredients() {
    const productTypes = await this.productTypeRepository.find({
      where: {
        isIngredient: true,
      },
    });

    return productTypes;
  }

  async create(dto: CreateProductTypeDto) {
    if (!dto.name) {
      throw new HttpException("Name is required", HttpStatus.BAD_REQUEST);
    }

    const productType = await this.productTypeRepository.save({
      ...dto,
    });

    return productType;
  }
}
