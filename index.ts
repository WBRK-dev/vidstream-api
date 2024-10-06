import { NextFunction, Request, Response } from 'express';

import { PORT } from './config/server';

import app from './api/index';
import routes from './routes';

routes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;