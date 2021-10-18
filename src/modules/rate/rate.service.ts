import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RateCreateDto, RateUpdateDto } from '@dto';
import { Rate } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private readonly rateRepository: Repository<Rate>,
  ) {}

  all() {
    return this.rateRepository.find();
  }

  one(id: string) {
    return this.rateRepository.findOne(id);
  }

  create(rate: RateCreateDto) {
    return this.save(rate);
  }

  async update(id: string, body: RateUpdateDto) {
    const rate = await this.rateRepository.preload({
      id: Number(id),
      ...body,
    });

    if (!rate) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    return this.save(rate);
  }

  private save(rate: RateCreateDto | RateUpdateDto) {
    return this.rateRepository.save(rate);
  }

  delete(id: string) {
    return this.rateRepository.delete(id);
  }
}
