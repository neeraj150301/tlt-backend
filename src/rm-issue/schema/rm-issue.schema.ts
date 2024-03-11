import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TltRmIssue extends Document {
  @Prop()
  issuedDocumentId: string;

  @Prop()
  issuedItemId: string;

  @Prop()
  issuedItemCount: number;

  @Prop()
  issuedItemWeight: number;

  @Prop()
  issuedBy: string;
}
export const TltRmIssueSchema = SchemaFactory.createForClass(TltRmIssue);
