import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";

@Entity("role")
export class Role {
  @ApiProperty({ example: "42" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Admin",
  })
  @Column("text")
  value: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User;
}
