import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './entities/otp.entity';
import { Model } from 'mongoose';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}
  async create(createOtpDto: CreateOtpDto) {
    const newOtp = await this.otpModel.create(createOtpDto);
    newOtp.save();
  }

  async findOne(username: string): Promise<Otp> {
    const otp = await this.otpModel.findOne({ username });
    return otp;
  }

  async remove(username: string) {
    await this.otpModel.findOneAndDelete({ username });
  }
}
