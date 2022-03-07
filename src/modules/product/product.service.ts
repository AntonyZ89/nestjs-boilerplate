import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUpdateDto } from 'src/dto/product/product-update.dto';
import { Repository } from 'typeorm';
import { ProductCreateDto } from '../../dto/product/product-create.dto';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
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
