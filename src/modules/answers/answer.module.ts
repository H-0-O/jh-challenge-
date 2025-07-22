import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  providers: [AnswerService],
  exports: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
