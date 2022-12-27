import { AuthModule } from '@infra/auth/auth.module';
import { JwtAuthGuard } from '@infra/auth/guards';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/httpd.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODO type envs
const env = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.POSTGRES_HOST,
      port: 5432,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HttpModule,
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    // Global JWT Guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
