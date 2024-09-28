import express, { NextFunction, Request, Response } from 'express';

import { PORT } from './config/server';

import routes from './routes';

const app = express();

routes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;