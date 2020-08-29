import express, { json } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import compression from 'compression';

import { connectToDatabase } from './database/createConnection';
import attachRoutes from './router';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const staticPath = path.resolve(__dirname, '../../client/dist');

app.use(compression());
app.use(cookieParser());
app.use(express.static(staticPath));
app.use(json());

connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
attachRoutes(app);
app.listen(port, () => console.log(`app stared in port:${port}`));
