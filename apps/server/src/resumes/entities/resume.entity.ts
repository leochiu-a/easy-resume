import { ApiProperty } from '@nestjs/swagger';
import { Resume } from '@prisma/client';
import { UserEntity } from '@server/users/entities/user.entity';
import { SocialLinkEntity } from './social-link.entity';
import { GroupEntity } from './group.entity';

export class ResumeEntity implements Resume {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string | null;

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

  @ApiProperty({ type: SocialLinkEntity, isArray: true })
  socialLinks: SocialLinkEntity[];

  @ApiProperty({ type: GroupEntity, isArray: true })
  groups: GroupEntity[];

  constructor({ user, ...partial }: Partial<ResumeEntity>) {
    Object.assign(this, partial);

    if (user) {
      this.user = new UserEntity(user);
    }
  }
}
