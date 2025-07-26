import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DocumentService } from './document.service';
import { Document } from '@prisma/client';

@Controller('document')
export class DocumentController {
    constructor(private readonly DocumentService: DocumentService) { }


    @Post('/get')
    getDocument(@Body() Body: { studyGroupId: number }) {
        console.log(Body.studyGroupId)
        return this.DocumentService.getDocument(Body.studyGroupId as number);
    }


    @Post()
    postDocument(@Body() document: Document) {
        if (!document.fileUrl) {
            return { message: "File url is empty" }
        }
        return this.DocumentService.registerDocument(document);
    }

}
