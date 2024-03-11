import { PartialType } from '@nestjs/mapped-types';
import { CreateTltUserDto } from './create-tlt-user.dto';

export class UpdateTltUserDto extends PartialType(CreateTltUserDto) {
    id: string;
  division: [];
  userType: String[];
}
