import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '@server/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@server/users/users.module';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { GoogleStrategy } from '../common/strategies/google.strategy';

// TODO: 放到 .env 文件中
export const jwtSecret = 'secret';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
    ConfigModule,
  ],
})
export class AuthModule {}
