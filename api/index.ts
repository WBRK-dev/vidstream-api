import app from "../index";

app.get("/", (req, res) => res.send("Vidstream API"));

export default app;