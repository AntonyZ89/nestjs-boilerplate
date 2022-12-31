import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExistValidator } from '../helpers/decorators/exist.decorator';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

type RequiredField = 'userId' | 'content' | 'category';

export type NotificationCreateInput = Pick<Notification, RequiredField> &
  Partial<Omit<Notification, RequiredField>>;

@Entity()
export class Notification extends BaseEntity {
  constructor(params?: NotificationCreateInput) {
    super();

    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ExistValidator(User)
  userId: number;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column({ type: 'timestamptz', nullable: true })
  readAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  canceledAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  /*
   * relations
   */

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn()
  user?: User;
}
