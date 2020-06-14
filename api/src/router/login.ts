import { Router } from 'express';
import { User } from '../entities/user';
import { generateHash } from '../utils/crypto';

const route = Router();
route.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOneOrFail({ userId: username });
    const hash = await generateHash(password, user.salt);
    if (hash === user.password) {
      if (req.session) {
        req.session.loggedIn = true;
      }
      res.send('ok');
    } else {
      throw new Error('wrong password');
    }
  } catch (err) {
    console.log(err);
    res.send('invalid username or password');
  }
});

export default route;
