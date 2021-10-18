import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDto } from '@dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
