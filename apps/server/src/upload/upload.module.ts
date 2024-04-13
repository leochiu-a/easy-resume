import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { SupabaseModule } from '@server/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
