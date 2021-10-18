import { Module } from '@nestjs/common';
import { AuthController, AuthService } from '@modules/auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
