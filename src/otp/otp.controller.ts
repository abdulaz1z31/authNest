import { Controller } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  async create(createOtpDto: CreateOtpDto) {
    return await this.otpService.create(createOtpDto);
  }

  async findOne(username: string) {
    return await this.otpService.findOne(username);
  }

  async remove(username: string) {
    return await this.otpService.remove(username);
  }
}
