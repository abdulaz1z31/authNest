/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable } from '@nestjs/common';
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
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private userService: UserService,
    private jwtService: JwtService,
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
    return await this.userService.create(userData);
  }
  async verify(
    username: string,
  ): Promise<{ message: string; statusCode: number }> {
    await this.userModel.findOneAndUpdate({ username }, { isActive: true });
    return {
      message: 'Profile activated',
      statusCode: 200,
    };
  }
  async login(userData: loginDto) {
    let curUser;
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
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async forgetPassword() {}
  async resetPassword() {}
  async getMe() {}
}
