import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from './create-resume.dto';
import { IsEmail } from 'class-validator';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @ApiProperty()
  readonly resumeTitle: string;

  @ApiProperty()
  readonly wantedJob: string;

  @ApiProperty()
  readonly avatarUrl: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  readonly intro: string;
}
