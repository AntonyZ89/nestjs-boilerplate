import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Interest } from './interest.entity';
import { RefreshToken } from './refreshToken.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * GENERAL
   */

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birthday: Date;

  @Column()
  gender: number;

  @Column({ type: 'timestamp' })
  acceptTermsAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  /**
   * SOCIAL
   */

  @Column()
  children: number;

  @Column()
  sexual_orientation: number;

  @Column()
  style: number;

  @Column()
  smoke: number;

  @Column()
  drunk: number;

  @Column()
  pets: number;

  @Column()
  hometown: string;

  @Column()
  webpage: string;

  @Column()
  about: string;

  @Column()
  passions: string;

  @Column()
  sports: string;

  @Column()
  activities: string;

  @Column()
  books: string;

  @Column()
  songs: string;

  @Column()
  tv_shows: string;

  gastronomic_preferences: string;

  /**
   * CONTACT
   */

  home_phone: string;

  phone: string;

  address_1: string;

  address_2: string;

  city: string;

  state: string;

  zip_code: string;

  country: string;

  /**
   * PROFESSIONAL
   */

  education: string;

  school: string;

  college: string;

  course: string;

  university_degree: string;

  company: string;

  year: string;

  profission: string;

  sector: string;

  /**
   * PERSONAL
   */

  title: string;

  strong_point: string;

  height: number;

  eye_color: string;

  hair_color: string;

  physical_type: string;

  body_art: string;

  appearance: string;

  like_me: string;

  /**
   * @RELATIONS
   */

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @ManyToMany(() => Interest, (interest) => interest.users)
  interests: Interest[];
}
