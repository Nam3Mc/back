import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class CreateContractDto {

    @IsNotEmpty()
    @IsDate()
    startDate: Date

    @IsNotEmpty()
    @IsDate()    
    endDate: Date

    @IsNotEmpty()
    @IsNumber()
    guests: number

    @IsBoolean()
    pet: boolean

    @IsBoolean()
    minor: boolean

    @IsNotEmpty()
    @IsUUID()
    accountId: string

    // @IsNotEmpty()
    // @IsUUID()
    // payment_: string
    // 
    @IsNotEmpty()
    @IsUUID()    
    propertyId: string
}
