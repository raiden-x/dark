import express from 'express';
import { createConnection } from 'typeorm';

/*
    Heroku dynamically assigns a port to the application
    through this env varaible
*/
const port = process.env.PORT || 3000;
const app = express();

async function connectToDb(): Promise<void> {
  await createConnection({
    type: 'postgres',
    database: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
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
