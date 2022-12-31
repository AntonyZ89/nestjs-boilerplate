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
import { UniqueValidator } from '../helpers/decorators/unique.decorator';
import { BaseEntity } from './base.entity';
import { Notification } from './notification.entity';

type RequiredField = 'username' | 'password';

export type UserCreateInput = Required<Pick<User, RequiredField>> &
  Partial<Omit<User, RequiredField>>;

@Entity()
export class User extends BaseEntity {
  constructor(params?: UserCreateInput) {
    super();

    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @UniqueValidator()
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
