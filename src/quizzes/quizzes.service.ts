import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/open-ai/open-ai.service';

@Injectable()
export class QuizzesService {
    constructor(private readonly OpenAI: OpenAIService) {
        this.OpenAI = new OpenAIService()
    }
    
    async GenerarQuiz({ focusing, quantity, title, typeOptions, document }: { focusing: string, quantity: number, title: string, typeOptions: string[], document: string }): Promise<any> {
        return this.OpenAI.generateQuizz(`Genera un quiz de ${quantity} preguntas sobre ${focusing} con las siguientes opciones: ${typeOptions.join(', ')}. El quiz debe tener un titulo: ${title} y debe ser sobre el siguiente documento: ${document}. La respuesta debe ser un JSON con el siguiente formato: { "quiz": [ { "question": "Pregunta", "options": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], "answer": "Opción correcta" } ] }`)

    }

}
