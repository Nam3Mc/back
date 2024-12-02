import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { AccountRepository } from "../account/account.repository";
import { AuthDto } from "src/dtos/auth.dto";
import { CreateUserDto } from "src/dtos/create-user.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly userDB: UserRepository,
        private readonly accountDB: AccountRepository
    ) {}

    async sigIn( authData: AuthDto) {
        const token = await this.accountDB.validateCredentials(authData)
        return token
    }

    async singUp(data: CreateUserDto ): Promise<Partial<User>> {
        const account = await this.userDB.createUser(data)
        if (account) {
            return account
        }
        else {
            throw new BadRequestException("An error has ocurred")    
        }
    }
}