import { IsDate, IsEmail, IsFQDN, IsPhoneNumber, Length, Max, Min } from 'class-validator';
import { GenderEnum } from 'src/enums/gender.enum';
import { MaritalEnum } from 'src/enums/marital.enum';
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
  @IsEmail()
  email: string;

  @Column()
  @Length(6)
  password: string;

  @Column()
  @IsDate()
  birthday: Date;

  @Column({ enum: GenderEnum })
  gender: GenderEnum;

  @Column('enum', { enum: MaritalEnum })
  marital_status: MaritalEnum;

  @Column({ type: 'timestamp' })
  @IsDate()
  acceptTermsAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  /**
   * SOCIAL
   */

  @Column()
  children: boolean;

  @Column()
  sexual_orientation: boolean;

  @Column()
  style: string;

  @Column()
  smoke: boolean;

  @Column()
  drunk: boolean;

  @Column()
  pets: boolean;

  @Column()
  hometown: string;

  @Column()
  @IsFQDN()
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

  @Column()
  gastronomic_preferences: string;

  /**
   * CONTACT
   */

  @Column()
  home_phone: string;

  @Column()
  @IsPhoneNumber('BR')
  phone: string;

  @Column()
  address_1: string;

  @Column()
  address_2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ length: 8 })
  zip_code: string;

  @Column()
  country: string;

  /**
   * PROFESSIONAL
   */

  @Column()
  education: string;

  @Column()
  school: string;

  @Column()
  college: string;

  @Column()
  course: string;

  @Column()
  university_degree: string;

  @Column()
  company: string;

  @Column()
  @Length(4)
  @Min(2004)
  @Max(2022)
  year: string;

  @Column()
  profession: string;

  @Column()
  sector: string;

  /**
   * PERSONAL
   */

  @Column()
  title: string;

  @Column()
  strong_point: string;

  @Column()
  height: number;

  @Column()
  eye_color: string;

  @Column()
  hair_color: string;

  @Column()
  physical_type: string;

  @Column()
  body_art: string;

  @Column()
  appearance: string;

  @Column()
  like_me: string;

  /**
   * RELATIONS
   */

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, { cascade: true })
  refreshTokens: RefreshToken[];

  @ManyToMany(() => Interest, (interest) => interest.users)
  interests: Interest[];
}
