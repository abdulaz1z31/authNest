/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { registerDto } from './dto/register-auth.dto';
import { loginDto } from './dto/login-auth.dto';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async register(userData: registerDto) {}
  async login(userData: loginDto) {}
  async verify() {}
  async forgetPassword() {}
  async resetPassword() {}
  async getMe() {}
}
