import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '@prisma/client';

export class ResumeEntity implements Resume {
  @ApiProperty()
  id: string;

  @ApiProperty()
  resumeTitle: string;

  @ApiProperty()
  wantedJob: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  intro: string;
}
