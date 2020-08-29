import { Router } from 'express';
import { UserPreference, Relation } from '../entities/userPreference';

const router = Router();

router.get('/:action', async (req, res) => {
  const actionType = req.params.action === Relation.IGNORE ? Relation.IGNORE : Relation.WATCH;
  const records = await UserPreference.find({
    where: { entityId: res.locals.userId, type: actionType },
  });
  return records.map((record) => record.userId);
});

router.post('/:action', async (req, res) => {
  const actionType = req.params.action === Relation.IGNORE ? Relation.IGNORE : Relation.WATCH;
  try {
    if (req.body.ignore) {
      const promiseArray: Promise<any>[] = req.body.enable.map((userId: string) => {
        const record = new UserPreference();
        record.entityId = res.locals.userId;
        record.userId = userId;
        record.type = actionType;
        return UserPreference.insert(record);
      });
      await Promise.all(promiseArray);
      res.send(200);
    }
    if (req.body.enable) {
      const promiseArray: Promise<any>[] = req.body.enable.map(async (userId: string) => {
        const record = await UserPreference.findOne({
          where: { userId, type: actionType, entityId: res.locals.userId },
        });
        return record?.remove();
      });
      await Promise.all(promiseArray);
      res.send(200);
    }
  } catch {
    res.sendStatus(500);
  }
});

export default router;
