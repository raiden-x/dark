import { Application } from 'express';

import AuthMiddleWare from '../Auth';
import StaticRoute from './static';
import SessionRoute from './session';
import UserPreferenceRoute from './userPreference';
import UserRoute from './user';

export default function attachRoutes(app: Application): void {
  app.use('/api', SessionRoute);
  app.use('/api/flow', AuthMiddleWare, UserPreferenceRoute);
  app.use('/api/flow/user', AuthMiddleWare, UserRoute);
  app.use('*', StaticRoute);
}
