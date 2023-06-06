import { ImageService } from "src/image/image.service";
import { ProductTypeService } from "src/product-type/product-type.service";
import { Product } from "src/product/product.entity";
import { ILike, Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productTypeService: ProductTypeService,
    private imageService: ImageService
  ) {}

  async create(dto: CreateProductDto) {
    const productType = await this.productTypeService.getByName(dto.type);

    const image = await this.imageService.getById(dto.imageId);

    const product = await this.productRepository.save({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      sale: dto.sale,
      weight: dto.weight,
      weightType: dto.weightType,
      type: productType,
      barcode: dto.barcode,
      boxSize: dto.boxSize,
      package: dto.package,
      quantityPerBox: dto.quantityPerBox,
      storageConditions: dto.storageConditions,
      availableQuantity: dto.availableQuantity,
      image,
    });

    return product;
  }

  async getAll() {
    const products = await this.productRepository.find({
      order: {
        name: "ASC",
      },
      relations: {
        type: true,
        image: true,
        reviews: true,
      },
    });

    return products;
  }

  async getById(id: number) {
    const products = await this.productRepository.findOne({
      where: { id },
      relations: {
        type: true,
        image: true,
        reviews: true,
      },
    });

    return products;
  }

  async findByName(name: string, productType: string) {
    const products = await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`),
        type: {
          name: ILike(`%${productType}%`),
        },
      },
      order: {
        name: "ASC",
      },
      relations: {
        type: true,
        image: true,
        reviews: true,
      },
    });

    return products;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        image: true,
        type: true,
        reviews: true,
      },
    });

    const productType = await this.productTypeService.getByName(dto.type);

    const image = await this.imageService.getById(dto.imageId);

    await this.productRepository.save({
      id,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      sale: dto.sale,
      weight: dto.weight,
      weightType: dto.weightType,
      type: productType,
      barcode: dto.barcode,
      boxSize: dto.boxSize,
      package: dto.package,
      quantityPerBox: dto.quantityPerBox,
      storageConditions: dto.storageConditions,
      availableQuantity: dto.availableQuantity,
      image,
    });

    await this.imageService.remove(product.image.src);

    const updatedProduct = await this.productRepository.findOne({
      where: { id },
      relations: {
        image: true,
        type: true,
        reviews: true,
      },
    });

    return updatedProduct;
  }
}
