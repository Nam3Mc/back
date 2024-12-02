import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from 'src/dtos/create-property.dto';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {

  constructor(
    private readonly propertyRepository: PropertyRepository
  ) {}

  newProperty(propertyData: CreatePropertyDto) {
    return this.propertyRepository.createProperty(propertyData)
  }
  
  seeProperties() {
    return this.propertyRepository.getProperties()
  }

  ownersProperties(id: string) {
    return this.propertyRepository.getOwnersProperties(id)
  }

}
