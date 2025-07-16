import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const client = new OpenAI();

@Injectable()
export class QuizzesService {
    private prisma = new PrismaClient();

    async GenerarQuiz({ focusing, quantity, title, typeOptions, document }: { focusing: string, quantity: number, title: string, typeOptions: string[], document: string }): Promise<any> {
        const response = await client.responses.create({
            model: "gpt-4.1",
            input: "Write a one-sentence bedtime story about a unicorn."
        });

        return response.output_text

    }

}
