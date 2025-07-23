import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { flashcard, flashcardInput } from 'src/flashcards/Dtos';

@Injectable()
export class FlashcardsService {
    private prisma = new PrismaClient();
    constructor(private readonly OpenAI: OpenAIService) {
        this.OpenAI = new OpenAIService()

    }

    async getFlashcards(studyGroupId: number){
        const flashcards = await this.prisma.flashcards.findMany({
            where: {
                studyGroupId: studyGroupId
            }
        })
        return flashcards
    }

    async createFlashcards(input: flashcardInput) {
        input.quantity = 4

        input.documentText = `
        La final de la Copa Mundial de la FIFA 2014 fue el partido final de la Copa del Mundo de 2014, la vigésima edición de la competición de la FIFA para selecciones nacionales de fútbol. El partido se jugó en el Estadio Maracaná de Río de Janeiro, Brasil, el 13 de julio de 2014, y lo disputaron Alemania y Argentina. El evento contó con la participación del anfitrión Brasil y otros 31 equipos que surgieron de la fase de clasificación, organizada por las seis confederaciones de la FIFA. Los 32 equipos compitieron en una fase de grupos, de la cual 16 equipos se clasificaron para la fase eliminatoria. De camino a la final, Alemania acabó primera del Grupo G, con dos victorias y un empate, tras lo cual derrotó a Argelia en octavos de final, a Francia en cuartos de final y a Brasil, por 7-1, en la semifinal. Argentina terminó líder del Grupo F con tres victorias, antes de derrotar a Suiza en octavos de final, Bélgica en cuartos de final y Países Bajos en la tanda de penales en semifinales. La final fue presenciada por 74 738 espectadores en el estadio, así como por más de mil millones de espectadores por televisión, siendo el árbitro del partido Nicola Rizzoli de Italia.

Gonzalo Higuaín perdió la oportunidad de anotar para Argentina en el primer tiempo cuando estaba cara a cara con el portero Manuel Neuer, y Benedikt Höwedes no logró darle la ventaja a su equipo poco antes del descanso cuando su disparo pegó en el poste. Lionel Messi tuvo la oportunidad de marcar cuando se enfrentó nuevamente a Neuer tras el descanso, pero su remate raso se fue desviado de la portería. En el minuto 71, Thomas Müller intentó marcar tras una jugada de André Schürrle y Mesut Özil, pero no logró controlar el balón y lo perdió ante el portero argentino Sergio Romero. Con el marcador sin goles en el minuto 90, el partido llegó a la prórroga, donde se rompió el empate en el segundo tiempo. Mario Götze, quien había ingresado como suplente poco antes del final del tiempo reglamentario, recibió en el pecho un centro de Schürrle desde la izquierda antes de patear la pelota con la zurda a la red para asegurar la victoria de los europeos por 1-0.

La victoria de la selección alemana fue su cuarto título de la Copa del Mundo y el primero desde la reunificación, así como la primera victoria de un equipo europeo en América. Götze fue nombrado mejor jugador del partido y Messi recibió el Balón de Oro como jugador destacado del torneo de la FIFA. El seleccionador alemán, Joachim Löw, calificó el triunfo como la culminación de un proyecto iniciado diez años antes por su predecesor Jürgen Klinsmann y elogió el espíritu de su equipo. Su homólogo argentino, Alejandro Sabella, consideró que su equipo había tenido mala suerte al perder y calificó a sus jugadores de «guerreros». La selección no pudo defender su trofeo en la Copa del Mundo de 2018 en Rusia, convirtiéndose en el tercer campeón consecutivo en ser eliminado en la fase de grupos tras las derrotas contra México y Corea del Sur.
        `
        const errores: string[] = []
        const flashcards: flashcard[] = await this.OpenAI.generateFlashcards(input)
        const studyGroupId = input.studyGroupId;
        for (let i = 0; i < flashcards.length; i++) {
            try {
                await this.prisma.flashcards.create({
                    data: {
                        question: flashcards[i].question,
                        answer: flashcards[i].answer,
                        studyGroupId: studyGroupId
                    }
                })
            } catch (error) {

                errores.push(`Error al crear Flashcard ${i + 1}; ${error.message}`)

            }


        }

        if (errores.length > 0) {
            throw new HttpException(
                {
                    message: 'Algunas flashcards no se pudieron crear.',
                    errores,
                },
                HttpStatus.PARTIAL_CONTENT, // 206
            );
        }


        return flashcards
    }


}
