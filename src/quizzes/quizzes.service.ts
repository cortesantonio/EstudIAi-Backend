import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { PrismaClient } from '@prisma/client';
import { Session } from '@prisma/client';
import type { CreateSessionInterface, Cuestionario, GenerateQuizInput, Pregunta } from './interface';
import { DocumentService } from 'src/document/document.service';
import type { ResultadoDTO } from './interface';
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

        const createSession = await this.CreateSession(newSession)
        // con este se crea la session para luego tomar el id de la session y hacer la asociación
        const sessionID = createSession.id

        const preguntas: Pregunta[] = createQuizzes.preguntas;
        for (let i = 0; i < preguntas.length; i++) {
            const pregunta = preguntas[i];

            try {
                const response = await this.prisma.question.create({
                    data: {
                        questionText: pregunta.pregunta,
                        type: pregunta.tipo,
                        answerOptions: pregunta.opciones || [],
                        correctOptionIndex: pregunta.opciones?.indexOf(pregunta.respuesta_correcta) || 0,
                        explanation: pregunta.explicacion,
                        sessionId: sessionID,
                        generatedBy: "ADMIN",
                        documentId: document.id
                    }
                })
                console.log("Pregunta creada correctamente:", response);
            } catch (error) {
                console.error(`Error al crear la pregunta en el índice ${i}:`, error);
            }

        }
        return
    }

    async GetSessions(studyGroupId: number): Promise<Session[]> {
        return this.prisma.session.findMany({
            where: {
                studyGroupId: studyGroupId
            }
        })
    }

    async GetGame(idSession: number){
        return this.prisma.question.findMany({
            where: {
                sessionId: idSession
            }
        })
    }

    async RegistrarResultado(juego: ResultadoDTO) {
        const { sessionId, userId, score } = juego;

        return this.prisma.sessionAnswered.create({
            data: {
                sessionId: sessionId,
                userId: userId,
                score: score,
                answeredAt: new Date()

            }
        })
    }


}
