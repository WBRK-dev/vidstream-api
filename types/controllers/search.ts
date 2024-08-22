import { MovieItem, TvSeriesItem } from "../common";

export interface SearchResponse {
    items: (MovieItem | TvSeriesItem)[];
    pagination: Pagination;
}

export interface Pagination {
    current: number;
    total: number;
}