import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "src/entities/image.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageRepository{
    constructor(
        @InjectRepository(Image)
        private readonly imageDB: Repository<Image>,
    ) {}

    async addImage(image: Express.Multer.File): Promise<string> {
        return "assd"
    }

}