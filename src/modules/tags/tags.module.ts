import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schema/tag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
