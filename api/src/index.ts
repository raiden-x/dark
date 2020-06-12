import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/createConnection';
import path from 'path';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const staticPath = path.resolve(__dirname, '../../client/dist');
console.log(staticPath);
app.use(express.static(staticPath));

app.listen(port, () => console.log(`example app started at port ${port}`));
connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
