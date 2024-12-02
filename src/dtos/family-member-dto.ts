import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Roll } from "src/enums/account";

  export class FamilyMemberDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()    
    nationality: string

    @IsNotEmpty()
    @IsNumber()
    dni: number

    @IsNotEmpty()
    @IsDate()
    DOB: Date

    @IsNotEmpty()
    @IsEnum(Roll)
    roll: Roll = Roll.MEMBER
}