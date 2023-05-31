import { Product } from "src/product/product.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrderController } from "./order.controller";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { ProductOrder } from "./product-order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, ProductOrder])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
