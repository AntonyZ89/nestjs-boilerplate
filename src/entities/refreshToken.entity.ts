import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  revoked: boolean;

  @Column()
  expires: Date;

  @CreateDateColumn()
  createdAt: Date;

  /**
   * @RELATIONS
   */

  @JoinTable({ name: 'user' })
  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;
}
