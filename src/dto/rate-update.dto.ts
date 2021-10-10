import { PartialType } from '@nestjs/mapped-types';
import { RateCreateDto } from './rate-create.dto';

export class RateUpdateDto extends PartialType(RateCreateDto) {}
