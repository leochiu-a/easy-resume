import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { PrismaModule } from '@server/prisma/prisma.module';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports: [PrismaModule],
})
export class ResumesModule {}
