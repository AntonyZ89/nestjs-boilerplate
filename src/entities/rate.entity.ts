import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @Column()
  productId: number;

  @Column('text')
  observation?: string;

  @CreateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  /**
   * @RELATIONS
   */

  @JoinTable({ name: 'product' })
  @ManyToOne(() => Product, (product) => product.rates, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  product: Product;
}
