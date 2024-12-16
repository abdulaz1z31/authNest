import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CustomError } from 'src/errors/error';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = await this.userModel.create(createUserDto);
    newUser.save();
    const user = newUser.toObject();
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new CustomError('User not found', 403);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!newUser) {
      throw new CustomError('User not found', 403);
    }
    return newUser;
  }

  async remove(id: string): Promise<{ message: string; statusCode: number }> {
    await this.userModel.findByIdAndDelete(id);
    return {
      message: 'user deleted successfully',
      statusCode: 200,
    };
  }
}
