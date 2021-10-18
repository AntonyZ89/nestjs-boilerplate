import { PartialType } from '@nestjs/mapped-types';
import { ProductCreateDto } from './product-create.dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
