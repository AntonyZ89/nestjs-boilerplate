import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';

export function makePagination<T>(
  items: Array<T>,
  options: IPaginationOptions<IPaginationMeta>,
): Pagination<T> {
  const page = Number(options.page);
  const limit = Number(options.limit);

  const offsetItems = Array.from(items).splice((page - 1) * limit, limit);

  return {
    items,
    meta: {
      currentPage: page,
      itemCount: offsetItems.length,
      itemsPerPage: limit,
      totalItems: items.length,
      totalPages: Math.floor(items.length / 10),
    },
  };
}
