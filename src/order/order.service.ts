import { Product } from "src/product/product.entity";
import { Between, Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./order.entity";
import { ProductOrder } from "./product-order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOrder)
    private productOrderRepository: Repository<ProductOrder>
  ) {}

  async getActive() {
    const res = await this.orderRepository.find({
      order: {
        created_at: "DESC",
      },
      relations: {
        productOrders: {
          product: {
            type: true,
          },
        },
      },
    });
    return res;
  }

  async create(dto: CreateOrderDto) {
    const order = await this.orderRepository.save({
      accepted: false,
      address: dto.address,
      lastName: dto.lastName,
      name: dto.name,
      phone: dto.phone,
      totalPrice: dto.totalPrice,
    });

    const productOrdersPromises = dto.orders.map(async (productOrder) => {
      const product = await this.productRepository.findOne({
        where: {
          id: productOrder.productId,
        },
      });

      await this.productOrderRepository.save({
        order,
        price: productOrder.price,
        count: productOrder.count,
        product,
      });

      await this.productRepository.save({
        id: product.id,
        availableQuantity: product.availableQuantity - productOrder.count,
      });
    });

    await Promise.all(productOrdersPromises);

    const res = await this.orderRepository.findOne({
      where: { id: order.id },
      relations: {
        productOrders: {
          product: {
            type: true,
          },
        },
      },
    });

    return res;
  }

  async updateAccepted(value: boolean, orderId: number) {
    await this.orderRepository.save({
      id: orderId,
      accepted: value,
      rejected: !value,
    });

    const res = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: {
        productOrders: {
          product: {
            type: true,
          },
        },
      },
    });

    return res;
  }

  async updateRejected(value: boolean, orderId: number) {
    await this.orderRepository.save({
      id: orderId,
      rejected: value,
      accepted: !value,
    });

    const res = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: {
        productOrders: {
          product: {
            type: true,
          },
        },
      },
    });

    return res;
  }

  async getOrdersBetween(f: Date, s: Date) {
    // const currentDate = new Date();
    // const startOfMonthDate = startOfMonth(currentDate);
    // const endOfMonthDate = endOfMonth(currentDate);
    const res = await this.orderRepository.find({
      where: {
        created_at: Between(f, s),
      },
      relations: {
        productOrders: {
          product: {
            type: true,
            reviews: true,
          },
        },
      },
    });

    return res;
  }
}
