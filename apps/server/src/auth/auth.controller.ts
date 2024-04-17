import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { HttpUser } from '../common/decorators/http-user.decorator';
import { GoogleLoginUserDto } from './dto/google-login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google-redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @HttpUser() user: GoogleLoginUserDto,
    @Res() res: Response,
  ) {
    const token = await this.authService.googleLogin(user);
    res.redirect(
      `${this.configService.get('FRONTEND_URL')}/oauth?token=${token.access_token}`,
    );
  }
}
