import { Request } from 'express';
import { User as UserEntity } from '../../../entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
