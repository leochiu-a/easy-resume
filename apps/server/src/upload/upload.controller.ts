import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from '@server/firebase/firebase.service';
import { JwtAuthGuard } from '@server/auth/jwt-auth.guard';
import { UserEntity } from '@server/users/entities/user.entity';
import { extname } from 'path';

const MAX_FILE_SIZE_1MB = 1 * 1024 * 1024;
const VALID_UPLOAD_FILE_TYPES = /(jpg|jpeg|png)/;

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: VALID_UPLOAD_FILE_TYPES,
        })
        .addMaxSizeValidator({
          maxSize: MAX_FILE_SIZE_1MB,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Req() req: any,
  ) {
    const user = new UserEntity(req.user);
    const path = `avatars/${user.id}${extname(file.originalname)}`;
    const fullPath = await this.firebaseService.uploadAvatar(path, file);

    return {
      path: fullPath,
    };
  }
}
