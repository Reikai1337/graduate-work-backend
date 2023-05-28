import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_type")
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;
}
