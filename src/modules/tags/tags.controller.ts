import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Delete ,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TagDto } from './dto/tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Get()
  async findAll(@Query() query): Promise<any> {
    const { search = '', page = 1 } = query;
    const count = await this.tagService.getUsersCount({
      username: { $regex: search, $options: '$i' },
    });
    return {
      count,
      currentPage: page,
      results: await this.tagService.find(query),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: TagDto): Promise<any> {
    const { name } = body;
    const isHas = await this.tagService.findOne({ name });
    if (isHas) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: '标签已存在',
      }, HttpStatus.BAD_REQUEST);
    } else {
      return {
        message: '创建成功',
        data: await this.tagService.create(body),
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id, @Body() body: TagDto): Promise<any> {
    return {
      message: '修改成功',
      data: await this.tagService.updateOne(id, body),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id) {
    return {
      message: '删除成功',
      data: await this.tagService.deleteOne(id),
    };
  }

}
