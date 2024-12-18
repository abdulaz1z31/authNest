import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { Otp, otpSchema } from './entities/otp.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: otpSchema }])],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
