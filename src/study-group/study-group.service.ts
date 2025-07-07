import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudyGroup } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudyGroupService {
  private prisma = new PrismaClient();

  async create({ name, adminId }: { name: string, adminId: number }): Promise<StudyGroup> {
    const inviteCode = Math.floor(100000 + Math.random() * 900000);
    return this.prisma.studyGroup.create({
      data: {
        name,
        inviteCode,
        isActive: true,
        admin: {
          connect: { id: adminId },
        },
      }
    });
  }

  async findAll(): Promise<StudyGroup[]> {
    return this.prisma.studyGroup.findMany();
  }

  async findOne(id: number): Promise<StudyGroup | null> {
    return this.prisma.studyGroup.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string }): Promise<StudyGroup> {
    return this.prisma.studyGroup.update({ where: { id }, data });
  }

  async remove(id: number): Promise<StudyGroup> {
    return this.prisma.studyGroup.delete({ where: { id } });
  }
}
