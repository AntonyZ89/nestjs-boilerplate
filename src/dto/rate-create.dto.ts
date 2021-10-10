import { IsNumber, IsString, Max } from 'class-validator';

export class RateCreateDto {
  @IsNumber()
  @Max(5)
  rate: number;

  @IsString()
  observation?: string;

  @IsNumber()
  product: number;
}
