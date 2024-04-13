import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { PrismaModule } from '@server/prisma/prisma.module';
import { SupabaseModule } from '@server/supabase/supabase.module';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports: [PrismaModule, SupabaseModule],
})
export class ResumesModule {}
