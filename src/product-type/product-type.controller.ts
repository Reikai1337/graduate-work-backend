import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateProductTypeDto } from "./dto/create-product-type.dto";
import { ProductTypeService } from "./product-type.service";

@Controller("product_type")
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) {}

  @Post()
  create(@Body() dto: CreateProductTypeDto) {
    return this.productTypeService.create(dto);
  }

  @Get()
  getAll() {
    return this.productTypeService.getAll();
  }

  @Get("/ingredients")
  getIngredient() {
    return this.productTypeService.getAllIngredients();
  }
}
