import { IsArray, IsBoolean, IsEnum, IsNotEmpty,  IsString,  MaxLength, MinLength, isArray } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(15)
    @IsString()
    phoneNumber:string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    @IsString()
    pin:string;

    @IsNotEmpty()
    @IsString()
    fullName:string;

    @IsArray()
    apps : [string];
}