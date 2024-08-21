import { Cheerio, CheerioAPI } from "cheerio";
import { MovieItem, TvSeriesItem } from "../types/common";

export function extractDetect($: CheerioAPI, el): MovieItem | TvSeriesItem {
    
    if ($(el).find(".info-split .badge-type").html()) {
        return extractTvSeries($, el);
    } else {
        return extractMovie($, el);
    }

}

export function extractMovie($: CheerioAPI, el): MovieItem {
    return {
        id: $(el).find("a").attr("href")?.split("-")?.pop() as string,
        title: $(el).find(".movie-name").text() as string,
        poster: $(el).find(".movie-thumbnail img").attr("src") as string,
        stats: {
            year: $(el).find(".info-split").children().eq(0).text(),
            duration: $(el).find(".info-split").children().eq(2).text(),
            rating: $(el).find(".info-split .is-rated").text().trim(),
        }
    };
}

export function extractTvSeries($: CheerioAPI, el): TvSeriesItem {
    return {
        id: $(el).find("a").attr("href")?.split("-")?.pop() as string,
        title: $(el).find(".movie-name").text() as string,
        poster: $(el).find(".movie-thumbnail img").attr("src") as string,
        stats: {
            seasons: $(el).find(".info-split").children().eq(1).text(),
            rating: $(el).find(".info-split .is-rated").text().trim(),
        }
    };
}