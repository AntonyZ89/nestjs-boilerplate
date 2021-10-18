import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RateCreateDto, RateUpdateDto } from '@dto';
import { RateService } from '@modules/rate';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  async create(@Body() body: RateCreateDto) {
    await this.rateService.create(body);

    return 'Avaliação cadastrada com sucesso.';
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: RateUpdateDto) {
    await this.rateService.update(id, body);

    return `Avaliação #${id} Atualizado com sucesso.`;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.rateService.delete(id);

    return `Avaliação #${id} removida com sucesso.`;
  }
}
