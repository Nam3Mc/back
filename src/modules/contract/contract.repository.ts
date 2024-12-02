import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateContractDto } from "src/dtos/create-contract.dto";
import { Contract } from "src/entities/contract.entity";
import { Repository } from "typeorm";
import { PropertyRepository } from "../property/property.repository";
import { Property } from "src/entities/property.entity";
import { Account } from "src/entities/account.entity";
import { AccountRepository } from "../account/account.repository";

@Injectable()
export class ContractRepository{
    constructor (
        @InjectRepository(Contract)
        private readonly contractDB: Repository<Contract>,
        private readonly propertyRepository: PropertyRepository,
        private readonly accountRepository: AccountRepository
    ) {}

    async availabilityValidator(startDate: Date, endDate: Date, propertyId: string): Promise<boolean> {
        const contracts = await this.contractDB.find({ where: { property_: { id: propertyId } } })
        if (contracts.length === 0) {
            return true
        }
        const checkIn = new Date(startDate).getTime()
        const checkOut = new Date(endDate).getTime()
        for (const contract of contracts) {
            const contractCheckIn = new Date(contract.startDate).getTime()
            const contractCheckOut = new Date(contract.endDate).getTime()
            if (
                (checkIn < contractCheckOut && checkOut > contractCheckIn) 
            ) {
                return false
            }
        }
        return true
    }

    async newContract(contractInfo: CreateContractDto): Promise<Contract> {
        const { startDate, endDate, guests, pet, minor, accountId, propertyId} = contractInfo
        const property: Property = await this.propertyRepository.getPropertyById(propertyId)
        const account: Account = await this.accountRepository.getAccountById(accountId)
        const isAvailable: boolean = await this.availabilityValidator(startDate, endDate, propertyId)
        if (isAvailable) {
            const newContract = new Contract
            newContract.startDate = new Date(startDate)
            newContract.endDate = new Date(endDate)
            newContract.guests = guests
            newContract.pet = pet
            newContract.minor = minor
            newContract.account_ = account
            newContract.property_ = property
            const createdContract: Contract = await this.contractDB.save(newContract) 
            return createdContract
        }
        else {
            throw new BadRequestException("There is not availability in this date")
        }

    }
}