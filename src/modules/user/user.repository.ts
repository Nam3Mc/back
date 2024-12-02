import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { AccountRepository } from "../account/account.repository";
import { CreateUserDto } from "src/dtos/create-user.dto";

@Injectable()
export class UserRepository{
    constructor (
        @InjectRepository(User)
        private readonly userDB: Repository<User>,
        private readonly accountDB: AccountRepository
    ){}

    getAll() {
        throw new Error('Method not implemented.');
    }

    async validateUser(dni:number, email: string): Promise<boolean> {
        const thereIsDni = await this.userDB.findOne({ where: {dni} })
        const thereIsEmail = await this.userDB.findOne({ where: {email} })
        if (thereIsDni || thereIsEmail) {
            return true
        }
        else {
            return false
        }
    }

    async createUser(data: CreateUserDto): Promise<Partial<User>> {
        
        const { name, lastName, email, phone, nationality, dni, DOB, civilStatus, employmentStatus, ...accountInfo} = data
        const accountData = accountInfo
        const thereIsUser = await this.validateUser(dni, email)
        
        if ( !thereIsUser ) {
            const thereIsAccount = await this.accountDB.validateAccount(accountData.userName)
            if (thereIsAccount) {
                throw new BadRequestException("This information is been used")
            }
            else {
                const newUser = new User
                newUser.name = name
                newUser.lastName = lastName
                newUser.email = email
                newUser.phone = phone
                newUser.nationality = nationality
                newUser.dni = dni
                newUser.DOB = DOB
                newUser.civilStatus = civilStatus
                newUser.employmentStatus = employmentStatus
                const account = await this.accountDB.createAccount(accountData)
                newUser.account_ = account
                const createdUser = await this.userDB.save(newUser)
                const { account_, ...profile} = createdUser
                return profile
            }
        }
        else {
            throw new BadRequestException("Some of the information provided is already been used")
        }
    }
}