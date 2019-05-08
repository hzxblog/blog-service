import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './interfaces/article.interface';
import { User } from '../users/interfaces/user.interface';
import { Tag } from '../tags/interface/tag.interface';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) {}

  async find(query): Promise<Article> {
    const { search = '', page = 1 } = query;
    const skip = (page - 1) * 20;
    const filter = {
      $or: [
        { title: { $regex: search, $options: '$i' } },
      ],
    };
    return await this.articleModel.find(filter, 'watcher is_publish created_time title tag', { skip, limit: 20 }).exec();
  }

  async findOne(id): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async create(article): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    return await createdArticle.save();
  }

  async updateOne(id, article: Article): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate(id, article);
  }

  async getUsersCount(query = {}): Promise<number> {
    return await this.articleModel.countDocuments(query);
  }

  async deleteOne(id): Promise<Article> {
    return await this.articleModel.findByIdAndDelete(id);
  }
}
