import { PartialType } from '@nestjs/mapped-types';
import { CreateTltRmDto } from './create-tlt-rm.dto';

export class UpdateTltRmDto extends PartialType(CreateTltRmDto) {
    id: string;
  
  pgNonPg: string;

  warehouse: string;

  documentNo: string;

  documentDate: string;

  vendorName: string;

  itemName: string;

  unit: string;

  receivedPieces: number;

  receivedQuantity: number;

  issuedPieces: number;

  issuedQuantity: number;

  balancePieces: number;

  balanceQuantity: number;

  balanceAmount: number;

  pendingDays: number;

  maxLength: number;

  minLength: number;

  averageLength: number;

  length: number;

  width: number;

  costCenter: string;

  section: string;

  createdBy: string;
}
