import express from 'express';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

/*
    Heroku dynamically assigns a port to the application
    through this env varaible
*/
console.log(dotenv.config());
const port = process.env.PORT || 3000;
const app = express();

async function connectToDb(): Promise<void> {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  } catch (err) {
    console.log(err);
  }
  console.log('connected to db');
}

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!');
});

app.listen(port, () => console.log(`example app started at port ${port}`));
connectToDb()
  .then(() => console.log('connected'))
  .catch(() => 'failed');
