import { Product } from "src/product/product.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", default: 0.0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "CASCADE",
  })
  product: Product;
}
