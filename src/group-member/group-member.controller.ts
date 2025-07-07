import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupMemberService } from './group-member.service';

@Controller('group-member')
export class GroupMemberController {
  constructor(private readonly groupMemberService: GroupMemberService) {}

  @Post()
  create(@Body() body: { userId: number; studyGroupId: number; role: string }) {
    return this.groupMemberService.create(body);
  }

  @Get()
  findAll() {
    return this.groupMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMemberService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { userId?: number; studyGroupId?: number; role?: string }) {
    return this.groupMemberService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMemberService.remove(Number(id));
  }
}
