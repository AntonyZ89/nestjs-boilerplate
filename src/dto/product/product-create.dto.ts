import { IsNumber, IsString, MaxLength } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;
}
