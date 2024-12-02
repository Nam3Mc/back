import { Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import { CreateContractDto } from 'src/dtos/create-contract.dto';

@Injectable()
export class ContractService {
  constructor (
    private readonly contractRepository: ContractRepository
  ) {}

  newContract(contractInfo: CreateContractDto) {
    return this.contractRepository.newContract(contractInfo)
  }
}
