import express, { json } from 'express';
import path from 'path';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import compression from 'compression';

import { connectToDatabase } from './Database/createConnection';
import websocket from './Websocket';
import attachRoutes from './Router';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const staticPath = path.resolve(__dirname, '../../client/dist');

app.use(compression());
app.use(cookieParser());
app.use(express.static(staticPath));
app.use(json());
websocket(server);

connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
attachRoutes(app);

server.listen(port, () => console.log(`app stared in port:${port}`));
