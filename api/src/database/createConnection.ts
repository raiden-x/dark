import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from '../entities/user';

export async function connectToDatabase(): Promise<void> {
  let connectionConfig: ConnectionOptions = {
    type: 'postgres',
    entities: [User],
  };
  if (process.env.NODE_ENV === 'production') {
    connectionConfig = {
      ...connectionConfig,
      url: process.env.DATABASE_URL,
    };
  } else {
    connectionConfig = {
      ...connectionConfig,
      host: process.env.DB_HOST,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
    };
  }
  try {
    await createConnection(connectionConfig);
    console.log('connected to database');
  } catch (err) {
    console.log(err);
  }
}
