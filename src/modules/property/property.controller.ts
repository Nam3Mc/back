import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from 'src/dtos/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  seeProperties() {
    return this.propertyService.seeProperties()
  }

  @Get(":id")
  ownersProperties(@Param("id") id: string) {
    console.log(id)
    return this.propertyService.ownersProperties(id)
  }
  
  @Post()
  addProperty(@Body() propertyData: CreatePropertyDto) {
    return this.propertyService.newProperty(propertyData);
  }

}
