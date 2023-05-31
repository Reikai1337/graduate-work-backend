import { Body, Controller, Post } from "@nestjs/common";

import { UploadReviewDto } from "./dto/upload-review.dto";
import { ReviewService } from "./review.service";

@Controller("review")
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@Body() dto: UploadReviewDto) {
    return this.reviewService.upload(dto.userId, dto.productId, dto.rating);
  }
}
