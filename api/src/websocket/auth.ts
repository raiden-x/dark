import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { Cookie, Claims } from '../Auth';
import { jwtSecret } from '../utils/crypto';

export default function validateWebsocketConnection(req: Request): Promise<string> {
  const res: Promise<string> = new Promise((resolve, reject) => {
    const cookies: Record<string, string> = req.cookies;
    const bearer = cookies[Cookie.BEARER];
    const urlXsrf = req.query.xsrfToken;
    jwt.verify(bearer, jwtSecret, (err, body) => {
      const cookieXsrf = (body as Record<string, string>)[Claims.XSRF];
      const userId = (body as Record<string, string>)[Claims.USERNAME];
      if (err || cookieXsrf !== urlXsrf) {
        throw new Error('xsrf mismatch');
      }
      resolve(userId);
    });
  });
  return res;
}
