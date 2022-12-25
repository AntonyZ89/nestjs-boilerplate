import { AuthModule } from '@infra/auth/auth.module';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/httpd.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule, DatabaseModule, AuthModule],
})
export class AppModule {}
