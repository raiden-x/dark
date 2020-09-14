import { createConnection, ConnectionOptions } from 'typeorm';
import { User } from '../Model/user';
import { UserPreference } from '../Model/userPreference';

export async function connectToDatabase(): Promise<void> {
  let connectionConfig: ConnectionOptions = {
    type: 'postgres',
    entities: [User, UserPreference],
  };
  if (process.env.NODE_ENV === 'production') {
    connectionConfig = {
      ...connectionConfig,
      url: process.env.DATABASE_URL,
    };
  } else {
    connectionConfig = {
      ...connectionConfig,
      url: process.env.DATABASE_URL,
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
