import { Module } from '@nestjs/common';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';
import { OpenAIService } from 'src/open-ai/open-ai.service';

@Module({
  controllers: [FlashcardsController],
  providers: [OpenAIService, FlashcardsService],

})
export class FlashcardsModule { }
