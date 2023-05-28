import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  login: string;

  @Column("text")
  name: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column("text")
  password: string;
}
