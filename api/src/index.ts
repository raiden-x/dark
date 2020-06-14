import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/createConnection';
import attachRoutes from './router';
import attachSession from './session';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
attachSession(app);
attachRoutes(app);

app.listen(port, () => console.log(`app stared in port:${port}`));
connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
