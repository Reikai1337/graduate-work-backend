import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { ProductOrder } from "./product-order.entity";

@Entity("order")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  lastName: string;

  @Column("text")
  phone: string;

  @Column("boolean")
  accepted: boolean;

  @Column("text")
  address: string;

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

  @Column({ type: "float", default: 0.0 })
  totalPrice: number;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  productOrders: ProductOrder;
}
