import { Controller, Post, UseGuards, Body, Req, Get, Param, Session } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import type { GenerateQuizInput } from './interface';
import type { ResultadoDTO } from './interface';


@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }

    @Post("/gen-with-ia")
    GenerarQuiz(@Body() body: GenerateQuizInput) {
        return this.quizzesService.GenerarQuiz(body);
    }

    @Get('/get-session/:id')
    async GetSessions(@Param('id') id: string) {
        return this.quizzesService.GetSessions(Number(id));
    }

    @Post('/session')
    async RegistrarRespuestas(@Body() resultado: ResultadoDTO) {
        return this.quizzesService.RegistrarResultado(resultado)
    }


    @Get('/get-game/:id')
    async GetGame(@Param('id') id: string) {
        return this.quizzesService.GetGame(Number(id));
    }


}
