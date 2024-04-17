import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { GoogleLoginUserDto } from './dto/google-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found for email: ' + email);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    return {
      access_token: this.jwtService.sign({ userId: user.id }),
    };
  }

  async googleLogin(user: GoogleLoginUserDto) {
    if (!user) {
      throw new UnauthorizedException('No user from google');
    }

    const { firstName, lastName, email } = user;
    const userData = await this.prismaService.user.findUnique({
      where: { email },
    });
    let userId = userData?.id;

    if (!userData) {
      const newUserData = await this.prismaService.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          password: 'password1234',
        },
      });
      userId = newUserData.id;
    }

    const access_token = this.jwtService.sign({ userId });

    return { access_token };
  }
}
