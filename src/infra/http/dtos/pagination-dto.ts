import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

export class PaginationDTO<T> implements Pagination<T> {
  items: Array<T>;

  @ApiProperty({
    properties: {
      itemCount: {
        type: 'integer',
        description: 'the amount of items on this specific page',
      },
      totalItems: {
        type: 'integer',
        nullable: true,
        description: 'the total amount of items',
      },
      itemsPerPage: {
        type: 'integer',
        description: 'the amount of items that were requested per page',
      },
      totalPages: {
        type: 'integer',
        nullable: true,
        description: 'the total amount of pages in this paginator',
      },
      currentPage: {
        type: 'integer',
        description: 'the current page this paginator "points" to',
      },
    },
  })
  meta: IPaginationMeta;
}
