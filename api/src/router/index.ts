import express, { Application } from 'express';
import path from 'path';

import AuthMiddleWare from '../Auth';
import StaticRoute from './static';
import SessionRoute from './session';
import UserPreferenceRoute from './session';

export default function attachRoutes(app: Application): void {
  app.use('/api', SessionRoute);
  app.use('/api/flow', AuthMiddleWare, UserPreferenceRoute);
  app.use('*', StaticRoute);
}
