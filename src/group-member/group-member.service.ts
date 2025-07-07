import { Injectable } from '@nestjs/common';
import { PrismaClient, GroupMember } from '../../generated/prisma';

@Injectable()
export class GroupMemberService {
  private prisma = new PrismaClient();

  async create(data: { userId: number; studyGroupId: number; role: string }): Promise<GroupMember> {
    return this.prisma.groupMember.create({ data });
  }

  async findAll(): Promise<GroupMember[]> {
    return this.prisma.groupMember.findMany();
  }

  async findOne(id: number): Promise<GroupMember | null> {
    return this.prisma.groupMember.findUnique({ where: { id } });
  }

  async update(id: number, data: { userId?: number; studyGroupId?: number; role?: string }): Promise<GroupMember> {
    return this.prisma.groupMember.update({ where: { id }, data });
  }

  async remove(id: number): Promise<GroupMember> {
    return this.prisma.groupMember.delete({ where: { id } });
  }
}
