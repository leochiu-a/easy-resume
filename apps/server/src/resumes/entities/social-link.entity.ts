import { ApiProperty } from '@nestjs/swagger';
import { SocialLink } from '@prisma/client';

export class SocialLinkEntity implements SocialLink {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  resumeId: string;
}
