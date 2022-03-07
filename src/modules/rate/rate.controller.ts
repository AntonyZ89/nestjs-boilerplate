import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RateUpdateDto } from 'src/dto/rate/rate-update.dto';
import { RateCreateDto } from '../../dto/rate/rate-create.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RateService } from './rate.service';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: RateCreateDto) {
    await this.rateService.create(body);

    return 'Avaliação cadastrada com sucesso.';
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: RateUpdateDto) {
    await this.rateService.update(id, body);

    return `Avaliação #${id} Atualizado com sucesso.`;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.rateService.delete(id);

    return `Avaliação #${id} removida com sucesso.`;
  }
}
