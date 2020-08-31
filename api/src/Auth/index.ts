import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { generateSalt, jwtSecret } from '../utils/crypto';

enum Cookie {
  BEARER = 'BEARER',
  XSRF = 'XSRF-TOKEN',
}

enum Claims {
  USERNAME = 'username',
  XSRF = 'xsrf',
}

enum Headers {
  XSRF = 'x-xsrf-token',
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const cookies: Record<string, string> = req.cookies;
  const bearer = cookies[Cookie.BEARER];
  const headerXsrf = req.headers[Headers.XSRF];
  try {
    jwt.verify(bearer, jwtSecret, (err, body) => {
      const cookieXsrf = (body as Record<string, string>)[Claims.XSRF];
      const userId = (body as Record<string, string>)[Claims.USERNAME];
      if (err || cookieXsrf !== headerXsrf) {
        throw new Error('xsrf mismatch');
      }
      res.locals = { userId };
      next();
    });
  } catch {
    res.sendStatus(403);
  }
}

export const addCookies = (req: Request, res: Response): void => {
  const { username } = req.body;
  const xsrfToken = generateSalt();
  const token = jwt.sign({ username, xsrf: xsrfToken }, jwtSecret);
  res.cookie(Cookie.BEARER, token, { httpOnly: true });
  res.cookie(Cookie.XSRF, xsrfToken);
};

export const removeCookies = (res: Response): void => {
  res.clearCookie(Cookie.BEARER);
  res.clearCookie(Cookie.XSRF);
};
