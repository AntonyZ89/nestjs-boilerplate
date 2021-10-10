import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { Product } from './entities/product.entity';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { Rate } from './entities/rate.entity';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Product, Rate]),
  ],
  controllers: [AppController, ProductController, RateController],
  providers: [AppService, RateService, ProductService],
})
export class AppModule {}
