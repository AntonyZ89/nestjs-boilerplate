import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
