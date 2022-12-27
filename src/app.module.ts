import { AuthModule } from '@infra/auth/auth.module';
import { JwtAuthGuard } from '@infra/auth/guards';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/httpd.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
  providers: [
    // Global JWT Guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
