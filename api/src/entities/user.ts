import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ unique: true })
  userId: string;
  @Column()
  salt: string;
  @Column()
  password: string;
  @CreateDateColumn()
  joined: string;
}
