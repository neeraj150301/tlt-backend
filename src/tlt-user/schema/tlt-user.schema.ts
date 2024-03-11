import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class TltUser extends Document {
  @Prop()
  division: string[];

  @Prop()
  userType: string[];
}
export const TltUserSchema = SchemaFactory.createForClass(TltUser);
