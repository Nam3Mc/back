import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import {FileInterceptor } from "@nestjs/platform-express"
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { diskStorage, memoryStorage } from 'multer';

@Controller('image')
export class ImageController {
  constructor(
    private readonly cloudinaryServise: CloudinaryService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("image", {storage: memoryStorage( ) }))
  async addImage(@UploadedFile() image: Express.Multer.File) {
    const url = await this.cloudinaryServise.uploadImage(image)
    return url
  }
}
