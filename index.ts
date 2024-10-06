import express from 'express';

import { PORT } from './config/server';

import cors from './middleware/cors';
import routes from './routes';

const app = express();

app.use(cors);
routes(app);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

export default app;