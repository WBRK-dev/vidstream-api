import { NextFunction, Request, Response, type Express } from 'express';

import {
    getHomeController,
    getMovieDetailsController,
    getMovieEpisodesController,
    getMovieSeasonsController,
    getMovieEpisodeServersController,
    getMovieEpisodeSourcesController
} from "../controllers/index";

export default (app: Express) => {

    app.use(verboseMessageOnHit);

	app.get('/home', (req: Request, res: Response) => catchExceptions(req, res, getHomeController));

    app.get("/movie/:id", (req: Request, res: Response) => catchExceptions(req, res, getMovieDetailsController));

    app.get("/movie/:id/seasons", (req: Request, res: Response) => catchExceptions(req, res, getMovieSeasonsController));
    app.get("/movie/:id/episodes", (req: Request, res: Response) => catchExceptions(req, res, getMovieEpisodesController));

    app.get("/movie/:id/servers", (req: Request, res: Response) => catchExceptions(req, res, getMovieEpisodeServersController));
    app.get("/movie/:id/sources", (req: Request, res: Response) => catchExceptions(req, res, getMovieEpisodeSourcesController));

}

async function catchExceptions(req: Request, res: Response, fn: (req: Request, res: Response) => any) {
    try {
        await fn(req, res);
    } catch (error) {
        console.log("\x1b[31m%s\x1b[0m", error);
        res.status(500).json({ kind: error.name, error: error.message });
    }
}

function verboseMessageOnHit(req: Request, _: Response, next: NextFunction) {
    const date = new Date();
    console.log(`${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getFullYear()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}, ${req.ip} ${req.url}`);
    next();
}