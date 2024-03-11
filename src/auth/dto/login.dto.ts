import { IsNotEmpty, IsString, Length, min } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @Length(10,15)
    phoneNumber: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    pin: string;
}
