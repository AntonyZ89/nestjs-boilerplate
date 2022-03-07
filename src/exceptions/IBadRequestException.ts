import { IsArray, IsNumber, IsString } from 'class-validator';

export class IBadRequestException {
  @IsNumber()
  statusCode: number;
  @IsArray()
  errors: Array<{ [key: string]: string }>;
  @IsString()
  message: string;
}
