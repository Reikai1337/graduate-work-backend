import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get("active")
  activeOrders() {
    return this.orderService.getActive();
  }

  @Post("accepted")
  updateAccepted(@Body() dto: { value: boolean; orderId: number }) {
    return this.orderService.updateAccepted(dto.value, dto.orderId);
  }
}
