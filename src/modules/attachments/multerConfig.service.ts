import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import config from '../../config';
import { base64, parseBase64 } from '../../utils/crypto';

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const multer = require('multer');

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createDir(dir) {
    if (fs.existsSync(dir)) {
      return;
    }
    this.createDir(path.parse(dir).dir);
    fs.mkdirSync(dir);
  }

  createMulterOptions(): MulterModuleOptions {
    const date = moment(Date.now()).format('YYYYMMDD');
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const dir = path.resolve(__dirname, `../../../`, config.UPLOAD_PATH, `${date}`);
          this.createDir(dir);
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const speArr = file.originalname.split('.');
          cb(null, `${base64(speArr[0])}.${speArr[1]}`);
        },
      }),
    };
  }
}
