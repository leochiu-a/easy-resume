import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResumesService } from './resumes.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeEntity } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { JwtAuthGuard } from '@server/auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResumeEntity, isArray: true })
  async findAll() {
    const resumes = await this.resumesService.findAll();
    return resumes.map((resume) => new ResumeEntity(resume));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResumeEntity })
  async findOne(@Param('id') id: string) {
    return new ResumeEntity(await this.resumesService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResumeEntity })
  async remove(@Param('id') id: string) {
    return new ResumeEntity(await this.resumesService.remove(id));
  }
}
