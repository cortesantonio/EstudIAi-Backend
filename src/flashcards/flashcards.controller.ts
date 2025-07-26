import { Controller, Get, Body, Post, UseGuards} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { flashcardInput } from 'src/flashcards/Dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('flashcards')
export class FlashcardsController {
    constructor(private readonly FlashCardsService: FlashcardsService) { }


    @Post("/getAllOf")
    @UseGuards(JwtAuthGuard)
    getFlashCards(@Body() body: { studyGroupId: string }) {
        return this.FlashCardsService.getFlashcards(parseInt(body.studyGroupId));
    }

    @Post()
    generarFlashCards(@Body() input: flashcardInput) {
        return this.FlashCardsService.createFlashcards(input);
    }

}
