import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { FlashcardsService } from 'src/flashcards/flashcards.service';
import { PrismaClient } from '@prisma/client';
import { Session } from '@prisma/client';
import type { CreateSessionInterface, Cuestionario, GenerateQuizInput } from './interface';
import type { flashcard, flashcardInput } from 'src/flashcards/Dtos';
import { DocumentService } from 'src/document/document.service';

@Injectable()
export class QuizzesService {
    private prisma = new PrismaClient();

    constructor(private readonly OpenAI: OpenAIService, private readonly Document: DocumentService) {
        this.OpenAI = new OpenAIService()
        this.Document = new DocumentService();
    }

    async CreateSession({ title, description, duration, studyGroupId }: CreateSessionInterface): Promise<Session> {

        const createdAt = new Date();
        return this.prisma.session.create({
            data: {
                title,
                description,
                duration,
                createdAt,
                studyGroupId
            }
        })
    }


    async GenerarQuiz(input: GenerateQuizInput): Promise<any> {
        const { focusing, quantity, title, typeOptions, studyGroupId } = input;
        const document = await this.Document.getDocument(studyGroupId);
        if (!document?.extractedText) {
            throw new Error('No se encontro el documento');
        }        

        const createQuizzes: Cuestionario = await this.OpenAI.generateQuizz(typeOptions, quantity, focusing, document.extractedText)
        const newSession: CreateSessionInterface = {
            title: title,
            description: createQuizzes.descripcion,
            duration: quantity * 2, // un aproximado del tiempo que tardaria por pregunta, mejor pasarlo a float para un resultado mas exacto.
            studyGroupId: studyGroupId
        }

        const createSession = await this.CreateSession(newSession) // con este se crea la session para luego tomar el id de la session y hacer la asociación
        const sessionID = createSession.id


        return createSession
    }

    async GetSessions(studyGroupId: number): Promise<Session[]> {
        return this.prisma.session.findMany({
            where: {
                studyGroupId: studyGroupId
            }
        })
    }



}
