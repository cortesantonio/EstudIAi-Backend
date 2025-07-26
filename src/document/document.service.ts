import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Document } from '@prisma/client';
import axios from 'axios';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class DocumentService {
    private prisma = new PrismaClient();

    async registerDocument(document: Document) {
        if (!document) {
            throw new Error('Document is required');
        }

        const response = await axios.get<ArrayBuffer>(document.fileUrl, {
            responseType: 'arraybuffer',
            timeout: 30_000,
            headers: { Accept: 'application/pdf' },
        });

        const buffer = Buffer.from(response.data);
        const result = await pdfParse(buffer);

        return await this.prisma.document.create({
            data: {
                title: document.title,
                studyGroupId: document.studyGroupId,
                fileUrl: document.fileUrl,
                extractedText: result.text,
                uploadedAt: new Date(),

            }
        });

    }

    async getDocument(studyGroupId: number) {
        return await this.prisma.document.findFirst({
            where: {
                studyGroupId: studyGroupId
            }
        })
    }

}
