import { PartialType } from '@nestjs/swagger';
import { RateCreateDto } from './rate-create.dto';

export class RateUpdateDto extends PartialType(RateCreateDto) {}
