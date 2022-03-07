import { PartialType } from '@nestjs/swagger';
import { ProductCreateDto } from './product-create.dto';

export class ProductUpdateDto extends PartialType(ProductCreateDto) {}
