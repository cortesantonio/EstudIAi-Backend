import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, StudyGroup } from '../../generated/prisma';

@Injectable()
export class StudyGroupService {
  private prisma = new PrismaClient();

  async create(data: { name: string }, userId: number): Promise<StudyGroup> {
    if (!userId) {
      throw new UnauthorizedException('No autorizado');
    }
    // Generar un código de invitación aleatorio (ejemplo simple)
    const inviteCode = Math.floor(100000 + Math.random() * 900000);

    return this.prisma.studyGroup.create({
      data: {
        name: data.name,
        adminId: userId,
        isActive: true,
        inviteCode,
      },
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
