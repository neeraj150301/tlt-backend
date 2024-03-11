import { IsArray, IsNotEmpty, } from "class-validator";

export class UpdateUserAppDto {
    @IsNotEmpty()
    @IsArray()
    apps: string[];
}
