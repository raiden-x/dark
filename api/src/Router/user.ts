import { Router } from 'express';

import { User } from '../Model/user';

const router = Router();

router.get('/:userId/check', async (req, res) => {
  const user = await User.findOne({ where: { userId: req.params.userId } });
  user ? res.send(true) : res.send(false);
});

export default router;
