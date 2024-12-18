import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register-auth.dto';
import { loginDto } from './dto/login-auth.dto';
import { OtpDataDto } from 'src/otp/dto/otpdata.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() userData: registerDto) {
    return await this.authService.register(userData);
  }
  @Post('login')
  async login(@Body() userData: loginDto) {
    return await this.authService.login(userData);
  }
  @Post('verify')
  async verify(@Body() otpData: OtpDataDto) {
    return await this.authService.verify(otpData);
  }
  @Post()
  async forgetPassword() {
    return await this.authService.forgetPassword();
  }
  @Post()
  async resetPassword() {
    return await this.authService.resetPassword();
  }
  @Get()
  async getProfile() {
    return await this.authService.getMe();
  }
}
