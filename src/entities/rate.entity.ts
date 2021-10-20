import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  /**
   * @RELATIONS
   */

  @ManyToOne(() => Product, (product) => product.rates, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  product: Product;
}
