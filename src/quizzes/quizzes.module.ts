import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { OpenAIService } from 'src/open-ai/open-ai.service';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, OpenAIService]
})
export class QuizzesModule {}
