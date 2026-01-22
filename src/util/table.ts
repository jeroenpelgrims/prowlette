import type { SearchResult } from "../api/useSearch";

export type SortBy = {
  column: keyof SearchResult;
  direction: "asc" | "desc";
};
