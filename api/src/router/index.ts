import path from 'path';
import StaticRoute from './static';
import express, { Application } from 'express';

export default function attachRoutes(app: Application): void {
  const staticPath = path.resolve(__dirname, '../../../client/dist');
  app.use(express.static(staticPath));
  app.use('*', StaticRoute);
}
