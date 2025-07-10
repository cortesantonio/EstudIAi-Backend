import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { StudyGroupService } from './study-group.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('study-group')
export class StudyGroupController {
  constructor(private readonly studyGroupService: StudyGroupService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: { name: string, hexColor: string }, @Req() req: Request) {
    return this.studyGroupService.create({ name: body.name, hexColor: body.hexColor, adminId: (req as any).user.id });
  }

  @Get()
  findAll() {
    return this.studyGroupService.findAll();
  }

  @Get('find-all-of')
  @UseGuards(JwtAuthGuard)
  findAllOf(@Req() req: Request) {
    return this.studyGroupService.findAllOf(Number(req.user?.id));
  }
  @Get('findOne/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string,) {
    return this.studyGroupService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string }) {
    return this.studyGroupService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyGroupService.remove(Number(id));
  }
}
