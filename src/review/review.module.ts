import { Image } from "src/image/image.entity";
import { Product } from "src/product/product.entity";
import { User } from "src/users/user.entity";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, User, Image])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
