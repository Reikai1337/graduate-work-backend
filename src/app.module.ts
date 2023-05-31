import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { Image } from "./image/image.entity";
import { ImageModule } from "./image/image.module";
import { Order } from "./order/order.entity";
import { OrderModule } from "./order/order.module";
import { ProductOrder } from "./order/product-order.entity";
import { ProductType } from "./product-type/product-type.entity";
import { ProductTypeModule } from "./product-type/product-type.module";
import { Product } from "./product/product.entity";
import { ProductModule } from "./product/product.module";
import { Review } from "./review/review.entity";
import { ReviewModule } from "./review/review.module";
import { Role } from "./roles/role.entity";
import { RolesModule } from "./roles/roles.module";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    OrderModule,
    ReviewModule,
    ImageModule,
    ProductModule,
    ProductTypeModule,
    UsersModule,
    RolesModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    MulterModule.register({
      dest: "./static",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveRoot: "/static",
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
        Role,
        User,
        ProductType,
        Product,
        Image,
        Review,
        Order,
        ProductOrder,
      ],
      subscribers: [],
      migrations: [],
    }),
  ],
})
export class AppModule {}
