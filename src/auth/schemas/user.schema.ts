import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ unique: true, required: true })
  phoneNumber: string;

  @Prop({ required: true })
  pin: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: false })
  fcmToken: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: true })
  isDefaultPin: boolean;

  @Prop({required: true, default: false })
  isSuperAdmin: boolean;

  @Prop()
  devices: string[];

  @Prop()
  deviceHistory: string[];

  @Prop()
  apps: string[];

  @Prop()
  sockets: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('pin') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.pin, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.pin = hash;
        next();
      });
    });
  } else {
    return next();
  }
});
