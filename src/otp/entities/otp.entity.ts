import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;

export class Otp {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  otp: string;
  @Prop({ required: true })
  expire_time: Date;
}

export const otpSchema = SchemaFactory.createForClass(Otp);
