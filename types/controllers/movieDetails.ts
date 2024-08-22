import { MovieItem, TvSeriesItem } from "../common";

export interface MovieDetailsResponse {
    title: string;
    description: string;
    type: string;
    stats: {name: string, value: string | string[]}[];
    related: (MovieItem | TvSeriesItem)[];
    episodeId?: string;
}