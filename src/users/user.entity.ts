import { Role } from "src/roles/role.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
}
