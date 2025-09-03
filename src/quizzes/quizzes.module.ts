import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { DocumentService } from 'src/document/document.service';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, OpenAIService, DocumentService],
})
export class QuizzesModule {}
