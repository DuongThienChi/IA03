import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const normalizedEmail = createUserDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const user = await this.userModel.create({
        email: normalizedEmail,
        password: hashedPassword,
      });

      return user.toJSON();
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new ConflictException('Email is already registered');
      }

      throw new InternalServerErrorException('Failed to register user');
    }
  }
}
