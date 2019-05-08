import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get('menu')
  async findAll(@Query() query): Promise<any> {
    const { search = '', page = 1 } = query;
    const count = await this.articleService.getUsersCount({
      title: { $regex: search, $options: '$i' },
    });
    return {
      count,
      currentPage: page,
      results: await this.articleService.find(query),
    };
  }

  @Get(':id')
  async find(@Param('id') id) {
    return await this.articleService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: ArticleDto): Promise<any> {
    return {
      message: '创建成功',
      data: await this.articleService.create(body),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id, @Body() body: ArticleDto): Promise<any> {
    return {
      message: '修改成功',
      data: await this.articleService.updateOne(id, body),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id) {
    return {
      message: '删除成功',
      data: await this.articleService.deleteOne(id),
    };
  }
}
