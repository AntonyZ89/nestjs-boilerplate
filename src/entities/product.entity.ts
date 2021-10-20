import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Rate } from './rate.entity';

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
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  /**
   * @RELATIONS
   */

  @OneToMany(() => Rate, (rate) => rate.product, { cascade: true })
  rates: Rate[];
}
