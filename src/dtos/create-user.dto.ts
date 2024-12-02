import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator"
import { CivilStatus, EmploymentStatus } from "src/enums/user";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { Roll } from "src/enums/account";

  export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @MinLength(10)
    phone: number;

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
    @IsEnum(CivilStatus)
    civilStatus: CivilStatus

    @IsNotEmpty()
    @IsEnum(EmploymentStatus)
    employmentStatus: EmploymentStatus

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName: string
        
    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, 
        { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character [!@#$%^&*]. It must be between 8 and 15 characters long." }
    )
    password: string;
    @Validate(MatchPassword, ["password"])
    comfirmPassword: string
        
    @IsEnum(Roll)
    roll: Roll = Roll.USER    

}