import { Product } from './entities/product.entity';
import { Rate } from './entities/rate.entity';
import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateModule } from './modules/rate/rate.module';

@Module({
  imports: [
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
    ProductModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
