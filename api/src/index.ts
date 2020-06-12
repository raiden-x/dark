import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/createConnection';
/*
    Heroku dynamically assigns a port to the application
    through this env varaible
*/
console.log(dotenv.config());
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
});

app.listen(port, () => console.log(`example app started at port ${port}`));
connectToDatabase()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
