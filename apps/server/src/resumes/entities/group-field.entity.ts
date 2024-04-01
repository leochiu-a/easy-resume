import { ApiProperty } from '@nestjs/swagger';
import { GroupField } from '@prisma/client';
import { TimelineEntity } from './timeline.entity';

export class GroupFieldEntity implements GroupField {
  @ApiProperty()
  id: string;

  @ApiProperty()
  field1: string | null;

  @ApiProperty()
  field2: string | null;

  @ApiProperty()
  field3: string | null;

  @ApiProperty()
  resumeGroupId: string | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty({ type: TimelineEntity })
  timeline: TimelineEntity | null;
}
