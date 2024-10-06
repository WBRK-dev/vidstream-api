import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
config();

export default (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
    res.header("Access-Control-Allow-Methods", "GET");
    next();
}