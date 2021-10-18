import { AuthModule } from '@modules/auth';
import { ProductModule } from '@modules/product';
import { RateModule } from '@modules/rate';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProductModule,
    // RateModule,
    // AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'nestjs',
      entities: ['dist/entities/*.entity.js'],
      migrations: ['src/migrations/*.js'],
      synchronize: false,
      autoLoadEntities: false,
    }),
    // TypeOrmModule.forFeature([Product, Rate]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
