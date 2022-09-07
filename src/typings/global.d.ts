export {};

declare global {
  type OrderDirection = 'asc' | 'desc';

  interface PaginateQuery {
    pageSize?: number;
    pageIndex?: number;
  }
}
