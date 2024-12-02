import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { cloudinaryConfig } from 'config/cloudinary';
import { ImageRepository } from './image.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository, CloudinaryService, cloudinaryConfig],
})
export class ImageModule {}
