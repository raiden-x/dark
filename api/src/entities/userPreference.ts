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
