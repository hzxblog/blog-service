import { Module } from '@nestjs/common';
import { AttchmentsController } from './attchments.controller';
import { AttchmentsService } from './attchments.service';

@Module({
  controllers: [AttchmentsController],
  providers: [AttchmentsService]
})
export class AttchmentsModule {}
