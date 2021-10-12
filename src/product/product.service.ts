import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCreateDto } from 'src/dto/product-create.dto';
import { ProductUpdateDto } from 'src/dto/product-update.dto';
import { Product } from 'src/entities/product.entity';
import { Rate } from 'src/entities/rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  all() {
    return this.productRepository.find({
      relations: ['rates'],
    });
  }

  async one(id: string) {
    const product = await this.productRepository.findOne(id, {
      relations: ['rates'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return product;
  }

  create(product: ProductCreateDto) {
    return this.save(product);
  }

  async update(id: string, body: ProductUpdateDto) {
    const product = await this.productRepository.preload({
      id: Number(id),
      ...body,
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return this.save(product);
  }

  /**
   * @param  {ProductCreateDto | ProductUpdateDto} product
   * @returns {Promise<Product>}
   */
  private save(product: ProductCreateDto | ProductUpdateDto) {
    return this.productRepository.save(product);
  }

  delete(id: string) {
    return this.productRepository.delete(id);
  }
}
