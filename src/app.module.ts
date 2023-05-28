import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { ProductType } from "./product-type/product-type.entity";
import { ProductTypeModule } from "./product-type/product-type.module";
import { Role } from "./roles/role.entity";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ProductTypeModule,
    // modules
    UsersModule,
    RolesModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        // tables
        Role,
        User,
        ProductType,
      ],
      subscribers: [],
      migrations: [],
    }),
  ],
})
export class AppModule {}
