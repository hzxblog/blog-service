import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpException,
  HttpStatus, Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<any> {
    return await this.usersService.find();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateUserDto): Promise<any> {
    const { username } = body;
    const isHasUser = await this.usersService.findOne({ username });
    if (isHasUser) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: '用户已存在',
      }, HttpStatus.BAD_REQUEST);
    } else {
      return {
        message: '创建成功',
        data: await this.usersService.create(body),
      };
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id, @Body() body: UpdateUserDto): Promise<any> {
    return {
      message: '修改成功',
      data: await this.usersService.updateOne(id, body),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOne(@Param('id') id) {
    return {
      message: '删除成功',
      data: await this.usersService.deleteOne(id),
    };
  }
}
