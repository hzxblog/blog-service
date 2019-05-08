import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import { HttpExceptionFilter} from './common/filters/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,PATCH,OPTIONS");
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with');
    next();
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(200).send({ msg: '成功' });
    } else {
      next();
    }
  });

  app.use(compression());
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(config.port, '0.0.0.0');
}
bootstrap();
