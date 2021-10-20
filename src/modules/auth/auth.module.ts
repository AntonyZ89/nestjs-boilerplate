import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/entities/refreshToken.entity';
import { User } from 'src/entities/user.entity';
import { RefreshTokenRepository } from 'src/repositories/refreshToken.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          privateKey: configService.get<string>('keys.privateKey'),
          publicKey: configService.get<string>('keys.publicKey'),
          signOptions: {
            expiresIn: configService.get<string>('keys.expiresIn'),
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigService,
    TypeOrmModule.forFeature([User, UserRepository, RefreshToken, RefreshTokenRepository]),
  ],
  providers: [AuthService, TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
