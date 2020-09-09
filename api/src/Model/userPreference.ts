import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
export enum Relation {
  WATCH = 'watch',
  IGNORE = 'ignore',
}

@Entity()
export class UserPreference extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  entityId: string;
  @Column()
  userId: string;
  @Column({
    type: 'enum',
    enum: Relation,
  })
  type: Relation;
}

export async function getUsersToNotify(userId: string): Promise<string[]> {
  const res = await UserPreference.find({ where: { userId, type: Relation.WATCH } });
  return res.map((record) => record.entityId);
}
