import { Router } from 'express';

import { User } from '../Model/user';
import { generateHash, generateSalt } from '../Utils/crypto';
import { addCookies, removeCookies } from '../Auth';

/*
1. Register flow:
    just adds the user name and the salted key
2. Login Flow:
    checks if the user id and the salted key matches
    generate a jwt with user id in the payload
    set that in the cookie bearer header
    set the XSRF token using the library
3. Protected Routes Flow:
    get the cookie bearer using the password library
    check if the jwt token is valid using json library
    check if the XSRF token is valid
    if both are valid ? proceed : clear XSRF token and cookie bearer and redirect to root
*/

const route = Router();
route.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOneOrFail({ userId: username });
    const hash = await generateHash(password, user.salt);
    if (hash === user.password) {
      addCookies(req, res);
      res.sendStatus(200);
    } else {
      throw new Error('wrong password');
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
});

route.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ userId: username });
  if (!user) {
    const salt = generateSalt();
    const hashedPassword = await generateHash(password, salt);
    await User.insert({ userId: username, salt: salt, password: hashedPassword });
    res.sendStatus(201);
  } else {
    res.status(500);
    res.send({
      failureReason: 'user id already exists',
    });
  }
});

route.post('/logout', (req, res) => {
  removeCookies(res);
  res.sendStatus(200);
});

export default route;
