import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ResumesModule } from './resumes/resumes.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ResumesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
