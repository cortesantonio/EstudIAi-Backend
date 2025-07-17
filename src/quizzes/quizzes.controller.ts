import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface ParamsGenerator {
    focusing: string; /* enfoque, conceptos, generalidades, muy especificos, variados */
    quantity: number;
    title: string;
    typeOptions: string[]; /* seleccion multiple, verdadero y falso, seleccion unica, respuestas corta  */
    document: string;

}

@Controller('quizzes')
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }
    
    @Post("/gen-with-ia")
    GenerarQuiz(@Body() body: { focusing: string, quantity: number, title: string, typeOptions: string[], document: string }) {
        return this.quizzesService.GenerarQuiz({ focusing: body.focusing, quantity: body.quantity, title: body.title, typeOptions: body.typeOptions, document: body.document });
    }
}
