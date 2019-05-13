import {
  Controller,
  Post,
  UseInterceptors,
  UseGuards,
  Request,
  UploadedFiles,
  HttpException,
  HttpStatus,
  Get,
  Delete, Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { base64, parseBase64 } from '../../utils/crypto';
import config from '../../config';

const fs = require('fs');
const path = require('path');
const moment = require('moment');

@Controller('attachments')
export class AttachmentsController {

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFile(@UploadedFiles() files) {
    if (files) {
      const file = files[0];
      return {
        message: '上传成功',
        path: file.path,
      };
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: '上传失败',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  getDirStat(name = '') {
    const files = fs.readdirSync(name, { withFileTypes: true });
    files.forEach(file => {
      const filePath = path.resolve(name, file.name);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        file.type = 'dir';
        file.path = `${config.host}/${config.UPLOAD_PATH}/${file.name}`;
        file.filePath = `${config.UPLOAD_PATH}/${file.name}`;
        file.children = this.getDirStat(filePath);
      }
      if (stat.isFile()) {
        const info = parseBase64(file.name.split('.')[0]);
        const date = moment(Date.now()).format('YYYYMMDD');
        file.path = `${config.host}/${config.UPLOAD_PATH}/${date}/${file.name}`;
        file.filePath = `${config.UPLOAD_PATH}/${date}/${file.name}`;
        file.type = 'file';
        file.info = info;
      }
    });
    return files;
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async getDir() {
    return this.getDirStat(path.resolve(__dirname, `../../../`, config.UPLOAD_PATH));
  }

  deleteFile(filePath) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(filePath);
      files.forEach(file => {
        const newPath = path.resolve(filePath, file);
        if (stat.isDirectory()) {
          this.deleteFile(newPath);
        }
        if (stat.isFile()) {
          fs.unlinkSync(newPath);
        }
      });
      fs.rmdirSync(filePath);
    }
    if (stat.isFile()) {
      fs.unlinkSync(filePath);
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete(@Query() query) {
    const { file } = query;
    if (file) {
      this.deleteFile(path.resolve(__dirname, '../../../' , file));
      return {
        message: '删除文件成功',
      };
    } else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: '请传递路径',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
