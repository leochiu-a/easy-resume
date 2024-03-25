import { ApiProperty } from '@nestjs/swagger';
import { GroupLayout, GroupType, ResumeGroup } from '@prisma/client';
import { GroupFieldEntity } from './group-field.entity';

export class GroupEntity implements ResumeGroup {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: GroupType;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: GroupFieldEntity, isArray: true })
  fields: GroupFieldEntity[];

  @ApiProperty()
  layout: GroupLayout;

  @ApiProperty()
  resumeId: string | null;
}
