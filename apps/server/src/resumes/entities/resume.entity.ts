import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '@prisma/client';
import { UserEntity } from '@server/users/entities/user.entity';

export class ResumeEntity implements Resume {
  @ApiProperty()
  id: string;

  @ApiProperty()
  resumeTitle: string | null;

  @ApiProperty()
  wantedJob: string | null;

  @ApiProperty()
  avatarUrl: string | null;

  @ApiProperty()
  city: string | null;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  intro: string | null;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({ user, ...partial }: Partial<ResumeEntity>) {
    Object.assign(this, partial);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
