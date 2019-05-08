import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Tag } from '../tags/interface/tag.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}

  async find(): Promise<User> {
    return await this.usersModel.findOne(
      null, 'username name email age address work_years phone').exec();
  }

  async findOne(query = {}): Promise<User> {
    return await this.usersModel.findOne(query);
  }

  async create(userDto): Promise<User> {
    const createdUser = new this.usersModel(userDto);
    return await createdUser.save();
  }

  async updateOne(id, user): Promise<User> {
    return await this.usersModel.findByIdAndUpdate(id, user);
  }

  async getUsersCount(query = {}): Promise<number> {
    return await this.usersModel.countDocuments(query);
  }

  async deleteOne(id): Promise<User> {
    return await this.usersModel.findByIdAndDelete(id);
  }
}
