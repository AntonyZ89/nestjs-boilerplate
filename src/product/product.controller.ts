import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from 'src/dto/product-create.dto';
import { ProductUpdateDto } from 'src/dto/product-update.dto';
import { RateService } from 'src/rate/rate.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    private rateService: RateService,
  ) {}

  @Get()
  index() {
    return this.productService.all();
  }

  @Get(':id')
  view(@Param('id') id: string) {
    return this.productService.one(id);
  }

  @Post()
  create(@Body() body: ProductCreateDto) {
    this.productService.create(body);

    return 'Cadastrado com sucesso.';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: ProductUpdateDto) {
    this.productService.update(id, body);

    return 'Atualizado com sucesso!';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.productService.delete(id);
  }
}
