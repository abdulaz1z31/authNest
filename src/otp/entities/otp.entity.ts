import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtpDocument = HydratedDocument<Otp>;
@Schema()
export class Otp {
  @Prop()
  username: string;
  @Prop()
  otp: string;
  @Prop()
  expire_time: Date;
}

export const otpSchema = SchemaFactory.createForClass(Otp);
