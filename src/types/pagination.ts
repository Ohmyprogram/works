interface Pagination {
  currentPage: number;
  totalPages: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export { type Pagination };
