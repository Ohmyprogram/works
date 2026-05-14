import { type Pagination } from "./pagination";

interface PageContext {
  affiliation?: string;
  group?: string;
  pagination: Pagination;
}

export { type PageContext };
