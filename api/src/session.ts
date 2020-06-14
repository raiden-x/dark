import session, { SessionOptions } from 'express-session';
import { Application } from 'express';

/*
using memeory story by default cannot be scaled. alternative
redis
*/
export default function setSession(app: Application): void {
  const sessionOptions: SessionOptions = {
    secret: 'darkness',
    saveUninitialized: false,
    resave: false,
  };
  app.use(session(sessionOptions));
}
