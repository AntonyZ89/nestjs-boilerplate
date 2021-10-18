import { RateModule } from '@modules/rate';
import { Module } from '@nestjs/common';
import { ProductController, ProductService } from '.';

@Module({
  imports: [RateModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
