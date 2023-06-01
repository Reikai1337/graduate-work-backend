import { ProductType } from "src/product-type/product-type.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("contract")
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0.0 })
  price: number;

  @Column("boolean", { default: false })
  accepted: boolean;

  @Column("boolean", { default: false })
  rejected: boolean;

  @Column("text")
  count: string;

  @Column("text")
  phone: string;

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

  @ManyToOne(() => ProductType, (productType) => productType.contracts)
  productType: ProductType;

  @ManyToOne(() => User, (user) => user.contracts)
  user: User;
}
