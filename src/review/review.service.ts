import { Product } from "src/product/product.entity";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Review } from "./review.entity";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async upload(userId: number, productId: number, rating: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
        product: true,
      },
    });

    if (review) {
      return this.reviewRepository.save({
        id: review.id,
        rating,
      });
    } else {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (user && product) {
        return this.reviewRepository.save({
          rating,
          user,
          product,
        });
      }
    }
  }
}
