import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from 'src/entities/contract.entity';
import { AccountModule } from '../account/account.module';
import { PropertyModule } from '../property/property.module';
import { ContractRepository } from './contract.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    AccountModule,
    PropertyModule
  ],
  controllers: [ContractController],
  providers: [ContractService, ContractRepository],
})

export class ContractModule {}
