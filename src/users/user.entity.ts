import { Contract } from "src/contract/contract.entity";
import { Review } from "src/review/review.entity";
import { Role } from "src/roles/role.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  login: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column("text")
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];
}
