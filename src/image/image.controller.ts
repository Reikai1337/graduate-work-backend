import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ImageService } from "./image.service";

@Controller("image")
export class ImageController {
  constructor(private imageService: ImageService) {}
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.uploadImage(file);
  }
}
