import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/createConnection';
import attachRoutes from './router';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
attachRoutes(app);

app.listen(port, () => console.log(`example app started at port ${port}`));
connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
