import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Rate } from '@entities';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Unique('idx-product-name', ['name'])
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @CreateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  /**
   * @RELATIONS
   */

  @OneToMany(() => Rate, (rate) => rate.product, { cascade: true })
  rates: Rate[];
}
