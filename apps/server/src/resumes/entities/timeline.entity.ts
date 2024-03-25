import { ApiProperty } from '@nestjs/swagger';
import { Timeline } from '@prisma/client';

export class TimelineEntity implements Timeline {
  @ApiProperty()
  id: string;

  @ApiProperty()
  from: Date | null;

  @ApiProperty()
  to: Date | null;

  @ApiProperty()
  groupFieldId: string;
}
