import { PartialType } from '@nestjs/mapped-types';
import { RateCreateDto } from '@dto';

export class RateUpdateDto extends PartialType(RateCreateDto) {}
