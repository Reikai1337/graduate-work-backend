import { Contract } from "src/contract/contract.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_type")
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("boolean", { default: false })
  isIngredient: boolean;

  @OneToMany(() => Product, (product) => product.type, {
    onDelete: "CASCADE",
  })
  product: Product;

  @OneToMany(() => Contract, (contract) => contract.productType)
  contracts: Contract[];
}
