import { forwardRef, Module } from '@nestjs/common';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsModule } from './modules/tags/tags.module';
import { AttchmentsModule } from './modules/attchments/attchments.module';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: config.mongoose,
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
    }),
    ArticlesModule,
    AuthModule,
    UsersModule,
    TagsModule,
    AttchmentsModule,
  ],
})
export class AppModule {}
