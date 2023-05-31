import { Image } from "src/image/image.entity";
import { ImageService } from "src/image/image.service";
import { ProductType } from "src/product-type/product-type.entity";
import { ProductTypeService } from "src/product-type/product-type.service";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductController } from "./product.controller";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductType, Product, Image])],
  controllers: [ProductController],
  providers: [ProductService, ProductTypeService, ImageService],
})
export class ProductModule {}
