import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { PrismaService } from '@server/prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { GroupLayout, GroupType } from '@prisma/client';
import { UserEntity } from '@server/users/entities/user.entity';
import { SupabaseService } from '@server/supabase/supabase.service';

@Injectable()
export class ResumesService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  create(createResumeDto: CreateResumeDto, user: UserEntity) {
    return this.prisma.resume.create({
      data: {
        userId: createResumeDto.userId,
        username: user.name,
        email: user.email,
        groups: {
          create: [
            {
              title: '工作經歷',
              type: GroupType.EmploymentHistory,
              layout: GroupLayout.Complex,
            },
            {
              title: '專業技能',
              type: GroupType.Skills,
              layout: GroupLayout.Simple,
            },
            {
              title: '教育經歷',
              type: GroupType.Education,
              layout: GroupLayout.Complex,
            },
          ],
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.resume.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    const resume = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        user: true,
        socialLinks: true,
        groups: {
          include: {
            fields: {
              include: {
                timeline: true,
              },
            },
          },
        },
      },
    });

    if (!resume) {
      throw new NotFoundException(`Resume with ${id} doesn't exist`);
    }

    if (resume.avatarUrl && resume.avatarUrl?.length > 0) {
      resume.avatarUrl = await this.supabaseService.retrieveAvatar(
        resume.avatarUrl,
      );
    }

    return resume;
  }

  update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: {
        ...updateResumeDto,
        socialLinks: {
          deleteMany: {},
          create: updateResumeDto.socialLinks,
        },
        groups: {
          deleteMany: {},
          create: updateResumeDto.groups.map((group) => {
            return {
              ...group,
              fields: {
                create: group.fields.map((field) => {
                  return {
                    ...field,
                    timeline: {
                      create: field.timeline,
                    },
                  };
                }),
              },
            };
          }),
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.resume.delete({ where: { id } });
  }
}
