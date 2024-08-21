import { MovieItem, TvSeriesItem } from "../common";

export interface HomePageResponse {
    spotlight: SpotlightItem[];
    trending: {
        movies: MovieItem[];
        tvSeries: TvSeriesItem[];
    };
    latestMovies: MovieItem[];
    latestTvSeries: TvSeriesItem[];
}

export interface SpotlightItem {
    id: string;
    title: string;
    banner: string;
    poster: string;
    rating?: string;
    year: string;
}