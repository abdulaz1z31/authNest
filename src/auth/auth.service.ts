import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { registerDto } from './dto/register-auth.dto';
import { loginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { userRole } from 'src/constants/role.enum';
import { CustomError } from 'src/errors/error';
import { Hashing } from 'src/hashing/hashing';
import { OtpService } from 'src/otp/otp.service';
import { generateOTP } from 'src/hashing/otp';
import { OtpDataDto } from 'src/otp/dto/otpdata.dto';
import { EmailService } from 'src/email/mailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private emailService: EmailService,
  ) {}

  async register(userData: registerDto): Promise<Omit<User, 'password'>> {
    const curUser = await this.userModel.findOne({
      email: userData.email,
    });
    if (curUser) {
      throw new CustomError('User already exists', 409);
    }
    userData.isActive = false;
    userData.role = userRole.user;
    const hashPassword = await Hashing.generate(userData.password);
    userData.password = hashPassword;
    const onetimepassword = generateOTP();
    const time = new Date(Date.now() + 3 * 60 * 1000);
    const otpData = {
      username: userData.username,
      otp: onetimepassword,
      expire_time: time,
    };
    await this.otpService.create(otpData);
    await this.emailService.sendEmail(
      userData.email,
      'Your otp password for register',
      onetimepassword,
    );
    return await this.userService.create(userData);
  }
  async verify(
    otpData: OtpDataDto,
  ): Promise<{ message: string; statusCode: number }> {
    const otpdata = await this.otpService.findOne(otpData.username);
    if (!otpdata) {
      throw new CustomError('otp not found', 403);
    }
    if (otpdata.otp !== otpData.otp) {
      throw new CustomError('Otp is not valid', 403);
    }
    const curTime = new Date(Date.now());
    if (otpdata.expire_time < curTime) {
      await this.otpService.remove(otpData.username);
      throw new CustomError('Time expired', 403);
    }
    await this.otpService.remove(otpData.username);
    await this.userModel.findOneAndUpdate(
      { username: otpData.username },
      { isActive: true },
    );
    return {
      message: 'Profile activated',
      statusCode: 200,
    };
  }
  async login(userData: loginDto): Promise<{ accessToken: string }> {
    let curUser: any;
    if (userData.email) {
      curUser = await this.userModel.findOne({
        email: userData.email,
      });
    } else {
      curUser = await this.userModel.findOne({
        username: userData.username,
      });
    }
    if (!curUser) {
      throw new CustomError('User not found', 403);
    }
    if (!curUser.isActive) {
      throw new CustomError('Account not verified', 409);
    }
    const payload = {
      id: curUser._id,
      username: curUser.username,
      role: curUser.role,
      isActive: curUser.isActive,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  async forgetPassword() {}
  async resetPassword() {}
  async getMe() {}
}
