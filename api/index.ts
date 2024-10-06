import express from "express";
import cors from "./modules/cors";

const app = express();

app.use(cors);

app.get("/", (req, res) => res.send("Vidstream API"));

export default app;