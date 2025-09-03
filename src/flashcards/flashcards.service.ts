import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { flashcard, flashcardInput } from 'src/flashcards/Dtos';
import { DocumentService } from 'src/document/document.service';

@Injectable()
export class FlashcardsService {
  private prisma = new PrismaClient();
  constructor(
    private readonly OpenAI: OpenAIService,
    private readonly Document: DocumentService,
  ) {
    this.OpenAI = new OpenAIService();
    this.Document = new DocumentService();
  }

  async getFlashcards(studyGroupId: number) {
    const flashcards = await this.prisma.flashcards.findMany({
      where: {
        studyGroupId: studyGroupId,
      },
    });
    return flashcards;
  }

  async createFlashcards(input: flashcardInput) {
    const document = await this.Document.getDocument(input.studyGroupId);
    if (!document?.extractedText) {
      throw new Error('No se encontro el documento');
    }
    input.documentText = document.extractedText;

    const errores: string[] = [];
    const flashcards: flashcard[] = await this.OpenAI.generateFlashcards(input);
    const studyGroupId = input.studyGroupId;
    for (let i = 0; i < flashcards.length; i++) {
      try {
        await this.prisma.flashcards.create({
          data: {
            question: flashcards[i].question,
            answer: flashcards[i].answer,
            studyGroupId: studyGroupId,
          },
        });
      } catch (error) {
        errores.push(`Error al crear Flashcard ${i + 1}; ${error.message}`);
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

    return flashcards;
  }
}
