import { AuthPayload } from '@/types';
import { UserRepository } from '@application/repositories';
import { User } from '@infra/database/typeorm/entities';
import { LoginResponse } from '@infra/http/dtos/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export type ProcessedUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<ProcessedUser | null> {
    const user = await this.userRepository.findByUsername(username);

    if (user && bcrypt.compareSync(pass, user.password)) {
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
