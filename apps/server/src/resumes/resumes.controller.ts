import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeEntity } from './entities/resume.entity';

@Controller('resumes')
@ApiTags('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @ApiResponse({ type: ResumeEntity })
  @Post()
  create() {
    return this.resumesService.create();
  }

  @ApiResponse({ type: ResumeEntity, isArray: true })
  @Get()
  findAll() {
    return this.resumesService.findAll();
  }

  @ApiResponse({ type: ResumeEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @ApiResponse({ type: ResumeEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(id, updateResumeDto);
  }

  @ApiResponse({ type: ResumeEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
}
