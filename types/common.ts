export interface MovieItem {
    id: string;
    title: string;
    poster: string;
    stats: MovieItemStats;
}

interface MovieItemStats {
    year: string;
    duration: string;
    rating: string;
}

export interface TvSeriesItem {
    id: string;
    title: string;
    poster: string;
    stats: TvSeriesItemStats;
}

interface TvSeriesItemStats {
    seasons: string;
    rating: string;
}