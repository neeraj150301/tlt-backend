import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TltRm extends Document {
  @Prop({ required: false })
  pgNonPg: string;

  @Prop({ required: false })
  warehouse: string;

  @Prop({ required: false })
  documentNo: string;

  @Prop({ required: false })
  documentDate: Date;

  @Prop({ required: false })
  vendorName: string;

  @Prop({ required: false })
  itemName: string;

  @Prop({ required: false })
  unit: string;

  @Prop({ required: false })
  receivedPieces: number;

  @Prop({ required: false })
  receivedQuantity: number;

  @Prop({ required: false })
  issuedPieces: number;

  @Prop({ required: false })
  issuedQuantity: number;

  @Prop({ required: false })
  balancePieces: number;

  @Prop({ required: false })
  balanceQuantity: number;

  @Prop({ required: false })
  balanceAmount: number;

  @Prop({ required: false })
  pendingDays: number;

  @Prop({ required: false })
  maxLength: number;

  @Prop({ required: false })
  minLength: number;

  @Prop({ required: false })
  averageLength: number;

  @Prop({ required: false })
  length: number;

  @Prop({ required: false })
  width: number;

  @Prop({ required: false })
  costCenter: string;

  @Prop({ required: false })
  section: string;

  @Prop({ required: false })
  createdBy: string;

  @Prop({ required: false })
  itemId: string;
}

export const TltRmSchema = SchemaFactory.createForClass(TltRm);
