import { Controller, Get, Post, Body, Param, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupMemberService } from './group-member.service';
import { Role } from '@prisma/client';


@Controller('group-member')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: { userId: number, studyGroupId: number, role: Role }, @Req() req: Request) {
    return this.groupMemberService.create(body);
  }

  @Get()
  findAll() {
    return this.groupMemberService.findAll();
  }
  @Get("/:id")
  getOf(@Param('id') id: string) {
    return this.groupMemberService.GetOf(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { userId: number, studyGroupId: number, role: Role }) {
    return this.groupMemberService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMemberService.remove(Number(id));
  }
}

