import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductCreateDto } from '../../dto/product-create.dto';
import { ProductUpdateDto } from '../../dto/product-update.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return await this.productService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async view(@Param('id') id: string) {
    return await this.productService.one(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: ProductCreateDto) {
    await this.productService.create(body);

    return 'Cadastrado com sucesso.';
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);

    return 'Atualizado com sucesso!';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productService.delete(id);
  }
}
