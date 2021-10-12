import { IsNumber, IsString, Max } from 'class-validator';

export class RateCreateDto {
  @IsNumber()
  readonly productId: number;

  @IsNumber()
  @Max(5)
  rate: number;

  @IsString()
  observation?: string;
}
