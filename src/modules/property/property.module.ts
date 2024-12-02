import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyRepository } from './property.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    AccountModule
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
  exports: [PropertyRepository]
})
export class PropertyModule {}
