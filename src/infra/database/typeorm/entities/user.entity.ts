import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Notification } from './notification.entity';

type RequiredField = 'username' | 'password';

export type UserCreateInput = Required<Pick<User, RequiredField>> &
  Partial<Omit<User, RequiredField>>;

@Entity()
export class User {
  constructor(params: UserCreateInput) {
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  /*
   * relations
   */

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications?: Notification[];
}
