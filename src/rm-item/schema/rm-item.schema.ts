import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TltRmItem extends Document {
  @Prop()
  itemName: string;

  @Prop()
  pgNonPg: string;

  @Prop()
  stockAmount: number;

  @Prop()
  section: string;

  @Prop()
  createdBy: string;
}
export const TltRmItemSchema = SchemaFactory.createForClass(TltRmItem);
