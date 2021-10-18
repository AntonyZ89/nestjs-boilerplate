import { IsNumber, IsString, MaxLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MaxLength(255)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;
}
