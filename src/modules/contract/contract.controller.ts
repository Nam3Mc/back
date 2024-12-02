import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from 'src/dtos/create-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  newContract(@Body() contractInfo: CreateContractDto) {
    return this.contractService.newContract(contractInfo);
  }
}
