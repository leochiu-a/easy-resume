import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from './create-resume.dto';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GroupLayout, GroupType } from '@prisma/client';

class SocialLinksDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly url: string;
}

class TimelineDto {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly from: string | null;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly to: string | null;
}

class GroupFieldDto {
  @ApiProperty()
  @IsString()
  readonly field1: string;

  @ApiProperty()
  @IsString()
  readonly field2: string;

  @ApiProperty()
  @IsString()
  readonly field3: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => TimelineDto)
  readonly timeline: TimelineDto;

  @ApiProperty()
  @IsString()
  readonly description: string;
}

class GroupDto {
  @ApiProperty()
  @IsEnum(GroupType)
  readonly type: GroupType;

  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsEnum(GroupLayout)
  readonly layout: GroupLayout;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupFieldDto)
  readonly fields: GroupFieldDto[];
}

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @ApiProperty()
  @IsString()
  readonly resumeTitle: string;

  @ApiProperty()
  @IsString()
  readonly wantedJob: string;

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty()
  @IsString()
  readonly city: string;

  @ApiProperty()
  @IsString()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly intro: string;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinksDto)
  socialLinks: SocialLinksDto[];

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupDto)
  groups: GroupDto[];
}
