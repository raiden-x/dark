import { Router } from 'express';
import crypto from 'crypto';
import { v4 } from 'uuid';

const route = Router();
route.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (req.session) {
    req.session.loggedIn = true;
  }
  const salt = v4();
  crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
    console.log(key.toString('hex'));
    res.send('ok');
  });
});

export default route;
