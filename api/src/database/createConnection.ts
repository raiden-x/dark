import { createConnection, ConnectionOptions } from 'typeorm';

export async function connectToDatabase(): Promise<void> {
  let connectionConfig: ConnectionOptions;
  if (process.env.NODE_ENV === 'production') {
    connectionConfig = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
    };
  } else {
    connectionConfig = {
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }
  try {
    await createConnection(connectionConfig);
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
}
