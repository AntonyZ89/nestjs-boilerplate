import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Rate } from './rate.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Rate, (rate) => rate.product, { cascade: true })
  @JoinTable()
  rates: Rate[];

  @Column()
  @Unique('idx-product-name', ['name'])
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal' })
  price: number;
}
