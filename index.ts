import express, { NextFunction, Request, Response } from 'express';
import PuppeteerManager from './utils/puppeteerManager';

import { PORT } from './config/server';

import routes from './routes';

const app = express();

app.use((req: any, res: Response, next: NextFunction) => { req.puppeteerManager = new PuppeteerManager(); next(); });
routes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;