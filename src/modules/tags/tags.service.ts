import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './interface/tag.interface';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private readonly tagsModel: Model<Tag>) {}

  async find(query): Promise<Tag> {
    const { search = '', page = 1 } = query;
    const skip = (page - 1) * 20;
    const filter = {
      $or: [
        { name: { $regex: search, $options: '$i' } },
      ],
    };
    return await this.tagsModel.find(filter, null, { skip, limit: 20 }).exec();
  }

  async findOne(query = {}): Promise<Tag> {
    return await this.tagsModel.findOne(query);
  }

  async create(data): Promise<Tag> {
    const createdUser = new this.tagsModel(data);
    return await createdUser.save();
  }

  async updateOne(id, data): Promise<Tag> {
    return await this.tagsModel.findByIdAndUpdate(id, data);
  }

  async getUsersCount(query = {}): Promise<number> {
    return await this.tagsModel.countDocuments(query);
  }

  async deleteOne(id): Promise<Tag> {
    return await this.tagsModel.findByIdAndDelete(id);
  }
}
