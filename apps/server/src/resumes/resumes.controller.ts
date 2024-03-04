import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResumesService } from './resumes.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeEntity } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';

@Controller('resumes')
@ApiTags('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ApiCreatedResponse({ type: ResumeEntity })
  async create(@Body() createResumeDto: CreateResumeDto) {
    const newResume = await this.resumesService.create(createResumeDto);
    return new ResumeEntity(newResume);
  }

  @Get()
  @ApiOkResponse({ type: ResumeEntity, isArray: true })
  async findAll() {
    const resumes = await this.resumesService.findAll();
    return resumes.map((resume) => new ResumeEntity(resume));
  }

  @Get(':id')
  @ApiOkResponse({ type: ResumeEntity })
  async findOne(@Param('id') id: string) {
    return new ResumeEntity(await this.resumesService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ResumeEntity })
  async update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return new ResumeEntity(
      await this.resumesService.update(id, updateResumeDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ResumeEntity })
  async remove(@Param('id') id: string) {
    return new ResumeEntity(await this.resumesService.remove(id));
  }
}
