import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { FlashcardsService } from 'src/flashcards/flashcards.service';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService, OpenAIService, FlashcardsService]
})
export class QuizzesModule {}
