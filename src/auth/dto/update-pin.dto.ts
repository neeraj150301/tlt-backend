import { IsNotEmpty, Length } from "class-validator";

export class UpdatePinDto {
    @IsNotEmpty()
    @Length(10,15)
    phoneNumber:string;
   
    @IsNotEmpty()
    @Length(6,6)
    pin:string;
}
