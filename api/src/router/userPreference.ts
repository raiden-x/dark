import { Router } from 'express';
import { UserPreference, Relation } from '../entities/userPreference';

const router = Router();

router.get('/:action', async (req, res) => {
  const actionType = req.params.action === Relation.IGNORE ? Relation.IGNORE : Relation.WATCH;
  try {
    const records = await UserPreference.find({
      where: { entityId: res.locals.userId, type: actionType },
    });
    const resData = records.map((record) => record.userId);
    res.send(resData);
  } catch {
    res.sendStatus(500);
  }
});

router.post('/:action', async (req, res) => {
  const actionType = req.params.action === Relation.IGNORE ? Relation.IGNORE : Relation.WATCH;
  try {
    if (req.body.add) {
      const promiseArray: Promise<any>[] = req.body.add.map((userId: string) => {
        const record = new UserPreference();
        record.entityId = res.locals.userId;
        record.userId = userId;
        record.type = actionType;
        return UserPreference.insert(record);
      });
      await Promise.all(promiseArray);
      res.sendStatus(200);
    }
    if (req.body.remove) {
      const promiseArray: Promise<any>[] = req.body.remove.map(async (userId: string) => {
        const record = await UserPreference.findOne({
          where: { userId, type: actionType, entityId: res.locals.userId },
        });
        return record?.remove();
      });
      await Promise.all(promiseArray);
      res.sendStatus(200);
    }
  } catch {
    res.sendStatus(500);
  }
});

export default router;
