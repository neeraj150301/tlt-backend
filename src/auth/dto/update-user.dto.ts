import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, Length } from 'class-validator';
// 
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @Length(10, 15)
  phoneNumber: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  isActive: boolean;
}
