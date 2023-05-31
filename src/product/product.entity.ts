import { Image } from "src/image/image.entity";
import { ProductOrder } from "src/order/product-order.entity";
import { Review } from "src/review/review.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { ProductType } from "../product-type/product-type.entity";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @Column({ type: "float", default: 0.0 })
  price: number;

  @Column({ type: "float", default: 0.0 })
  sale: number;

  @Column({ type: "float", default: 0.0 })
  weight: number;

  @Column("text")
  weightType: string;

  @Column("text")
  package: string;

  @Column("text")
  barcode: string;

  @Column("text")
  boxSize: string;

  @Column("text")
  storageConditions: string;

  @Column({ type: "float", default: 0.0 })
  quantityPerBox: number;

  @ManyToOne(() => ProductType, (productType) => productType.product, {
    onDelete: "CASCADE",
  })
  type: ProductType;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  image: Image;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
  orders: ProductOrder[];
}
