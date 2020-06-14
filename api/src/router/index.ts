import path from 'path';
import StaticRoute from './static';
import LoginRoute from './login';
import express, { Application } from 'express';

export default function attachRoutes(app: Application): void {
  const staticPath = path.resolve(__dirname, '../../../client/dist');
  const baseApiRoute = '/api';
  app.use(baseApiRoute, LoginRoute);
  app.use(express.static(staticPath));
  app.use('*', StaticRoute);
}
