export interface EpisodeSourcesResponse {
    sources: {
        src: string;
        type: string;
    }[];
    tracks: {
        file: string;
        label: string;
        kind: string;
        default?: boolean;
    }[];
}

