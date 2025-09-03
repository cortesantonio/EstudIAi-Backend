import { Injectable } from '@nestjs/common';
import { StudyGroup } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudyGroupService {
  private prisma = new PrismaClient();

  async create({
    name,
    hexColor,
    adminId,
  }: {
    name: string;
    hexColor: string;
    adminId: number;
  }): Promise<StudyGroup> {
    const inviteCode = Math.floor(100000 + Math.random() * 900000);
    return this.prisma.studyGroup.create({
      data: {
        hexColor,
        name,
        inviteCode,
        isActive: true,
        admin: {
          connect: { id: adminId },
        },
      },
    });
  }
  async findOne(id: number): Promise<StudyGroup | null> {
    return this.prisma.studyGroup.findUnique({
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            avatarUrl: true,
            name: true,
          },
        },
      },
      where: { id },
    });
  }

  async findAll(): Promise<StudyGroup[]> {
    return this.prisma.studyGroup.findMany();
  }

  async findAllOf(id: number): Promise<StudyGroup[] | null> {
    return this.prisma.studyGroup.findMany({
      include: { admin: true },
      where: { adminId: id },
    });
  }

  async update(id: number, data: { name?: string }): Promise<StudyGroup> {
    return this.prisma.studyGroup.update({ where: { id }, data });
  }

  async remove(id: number): Promise<StudyGroup> {
    return this.prisma.studyGroup.delete({ where: { id } });
  }
}
