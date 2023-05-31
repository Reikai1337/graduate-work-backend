import { Product } from "src/product/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Order } from "./order.entity";

@Entity("product_order")
export class ProductOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0.0 })
  price: number;

  @Column({ type: "float", default: 0.0 })
  count: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.productOrders, {
    onDelete: "CASCADE",
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orders)
  product: Product;
}
