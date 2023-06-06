import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get("/all")
  getAll() {
    return this.productService.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.productService.getById(+id);
  }

  @Post("/findByName")
  findByName(@Body() dto: { name: string; productType: string }) {
    return this.productService.findByName(dto.name, dto.productType);
  }

  @Patch("/:id")
  updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }
}
