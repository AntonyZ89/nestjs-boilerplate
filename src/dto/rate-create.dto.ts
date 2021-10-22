import { IsNumber, IsString, Max } from 'class-validator';

export class RateCreateDto {
  @IsNumber()
  readonly productId: number;

  @IsNumber()
  @Max(5)
  readonly rate: number;

  @IsString()
  readonly observation?: string;
}
