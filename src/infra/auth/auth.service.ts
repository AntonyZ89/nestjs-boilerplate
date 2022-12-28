import { AuthPayload } from '@/types';
import { User } from '@infra/database/typeorm/entities';
import { LoginResponse } from '@infra/http/dtos/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

export type ProcessedUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<ProcessedUser | null> {
    // gets user using query builder to force select of password
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .getOne();

    if (user && bcrypt.compareSync(pass, user.password!)) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: ProcessedUser): Promise<LoginResponse> {
    const payload: Omit<AuthPayload, 'iat' | 'exp'> = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      // TODO add expiresIn param
    };
  }
}
