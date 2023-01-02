import { AuthModule } from '@infra/auth/auth.module';
import { JwtAuthGuard } from '@infra/auth/guards';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/httpd.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isTest } from './helper';

const env = process.env;

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const options: Writeable<TypeOrmModuleOptions> = {
          type: 'postgres',
          host: env.POSTGRES_HOST,
          port: 5432,
          username: env.POSTGRES_USER,
          password: env.POSTGRES_PASSWORD,
          database: env.POSTGRES_DB,
          autoLoadEntities: true,
          synchronize: true,
        };

        if (isTest()) {
          options.dropSchema = true;
          options.database = env.POSTGRES_DB_TEST;
        }

        return options;
      },
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
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
