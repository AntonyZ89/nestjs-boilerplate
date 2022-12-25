import { AuthPayload } from '@/types';
import { UserRepository } from '@application/repositories';
import { LoginResponse } from '@infra/http/dtos/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

type ProcessedUser = User;

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
    const user = await this.userRepository.findByName(username);

    // TODO use [bcrypt]
    if (user /* && user.password === pass*/) {
      const { /* password,  */ ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(user: ProcessedUser): Promise<LoginResponse> {
    const payload: Omit<AuthPayload, 'iat' | 'exp'> = {
      username: user.name,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      // TODO add expiresIn param
    };
  }
}
