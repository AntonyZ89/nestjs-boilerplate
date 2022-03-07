import { OmitType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class UserMeDTO extends OmitType(User, ['id', 'password', 'refreshTokens']) {}
