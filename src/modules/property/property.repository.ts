import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePropertyDto } from "src/dtos/create-property.dto";
import { Property } from "src/entities/property.entity";
import { Repository } from "typeorm";
import { AccountRepository } from "../account/account.repository";
import { ImageDto } from "src/dtos/image.dto";
import { Image } from "src/entities/image.entity";

@Injectable()
export class PropertyRepository{

    constructor(
        @InjectRepository(Property)
        private readonly propertyDB: Repository<Property>,
        private readonly accountDB: AccountRepository
    ) {}

    async getProperties() {
        const properties = await this.propertyDB.find()
        return properties
    }

    async getPropertyById(id: string ): Promise<Property> {
        const property:Property = await this.propertyDB.findOneBy({ id })
        if(!property) {
            throw new NotFoundException("This property does not exist")
        }
        else {
            return property
        }
    }

    async getOwnersProperties(id: string): Promise<Property[]>  {
        const properties = await this.propertyDB.find({
            where: {account_: {id}}
        })
        if (!properties) {
            throw new NotFoundException("You haven't listed a property yet")
        }
        else {
            return properties
        }
    }

    async createProperty(propertyData: CreatePropertyDto) {
        const {name, price, image, description, address, hasMinor, pets, accountId } = propertyData
        const account = await this.accountDB.getAccountById(accountId)
        if (!account) {
            throw new BadRequestException("Was not posible add the property to you account")
        }
        else {
            const newProperty = new Property
            newProperty.name = name
            newProperty.price = price
            newProperty.description = description
            newProperty.address = address
            newProperty.hasMinor = hasMinor
            newProperty.pets = pets
            newProperty.account_ = account
            const createdProperty = await this.propertyDB.save(newProperty) 
            return createdProperty
        }
    }

    async addImage(image: ImageDto, id: string): Promise<void> {
        const property = await this.propertyDB.findOneBy({id})
        if ( !property) {
            throw new BadRequestException("This property does not exist")
        }
        else {
            const newImage = new Image
            newImage.url = image.url
            newImage.property_ = property
            const updatedProperty = await this.propertyDB.save(property)
        }
    }
}
