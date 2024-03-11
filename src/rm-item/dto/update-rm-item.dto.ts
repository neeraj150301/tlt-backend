import { PartialType } from '@nestjs/mapped-types';
import { CreateRmItemDto } from './create-rm-item.dto';
// import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRmItemDto extends PartialType(CreateRmItemDto) {
    // @IsNotEmpty()
    // @IsString()
    id: string;
    itemName: string;
    pgNonPg: string;
    warehouse: string;
    stock: string;
    sections: string;
    documentNo: string;
    maxLength: string;
    minLength: string;
    averageLength: string;
    length: string;
    width: string;
    costCenter: string;
    createdBy: string;
}
