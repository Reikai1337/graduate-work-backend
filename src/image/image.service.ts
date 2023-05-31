import * as fs from "fs";
import * as path from "path";
import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Image } from "./image.entity";

@Injectable()
export class ImageService {
  @InjectRepository(Image)
  private imageRepository: Repository<Image>;

  async getById(id: number) {
    const image = await this.imageRepository.findOne({
      where: { id },
    });

    return image;
  }

  async delete(id: number) {}

  async uploadImage(file: Express.Multer.File) {
    try {
      const image = new Image();
      image.src = file.originalname.replace(/\s/g, "_");

      const directoryPath = path.join("static");
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const lastImage = await this.imageRepository.findOne({
        where: {},
        order: {
          created_at: "DESC",
        },
      });

      const newFilePath = path.join(
        directoryPath,
        `${lastImage?.id || 0}-${file.originalname.replace(/\s/g, "_")}`
      );

      const buffer = Buffer.from(file.buffer);

      await fs.promises.writeFile(newFilePath, buffer);

      return this.imageRepository.save({
        src: newFilePath,
      });
    } catch (error) {
      throw new Error("Error while saving the file");
    }
  }

  async remove(src: string) {
    try {
      const image = await this.imageRepository.findOne({
        where: {
          src,
        },
      });

      if (image) {
        await fs.promises.rm(image.src);
        await this.imageRepository.remove(image);
      }
    } catch (error) {}
  }
}
