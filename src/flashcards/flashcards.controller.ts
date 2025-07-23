import { Controller, Get, Body, Post } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { flashcardInput } from 'src/flashcards/Dtos';

@Controller('flashcards')
export class FlashcardsController {
    constructor(private readonly FlashCardsService: FlashcardsService) { }


    @Post("/getAllOf")
    getFlashCards(@Body() body: { studyGroupId: string }) {
        return this.FlashCardsService.getFlashcards(parseInt(body.studyGroupId));
    }

    @Post()
    generarFlashCards(@Body() input: flashcardInput) {
        return this.FlashCardsService.createFlashcards(input);
    }

}
