import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class ResumesService {
  constructor(private prisma: PrismaService) {}

  create() {
    return this.prisma.resume.create({
      data: {},
    });
  }

  findAll() {
    return this.prisma.resume.findMany();
  }

  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({ where: { id } });
    if (!resume) {
      throw new NotFoundException(`Resume with ${id} doesn't exist`);
    }
    return resume;
  }

  update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: updateResumeDto,
    });
  }

  remove(id: string) {
    return this.prisma.resume.delete({ where: { id } });
  }
}
