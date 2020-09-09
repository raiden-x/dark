import jwt from 'jsonwebtoken';

import { Cookie, Claims, Headers } from '../Auth';
import { jwtSecret } from '../Utils/crypto';
import { getCookie, getQueryParam } from '../Utils/url';

export default function validateWebsocketConnection(req: Request): Promise<string> {
  const res: Promise<string> = new Promise((resolve, reject) => {
    const cookies = (req.headers as any).cookie;
    const bearer = getCookie(Cookie.BEARER, cookies);
    const urlXsrf = getQueryParam(req.url.slice(1), Headers.XSRF);
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
