import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type CreateUserRequest = Prisma.UserCreateInput;

interface CreateUserResponse {
  user: Omit<User, 'password'>;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    request.password = bcrypt.hashSync(
      request.password,
      bcrypt.genSaltSync(10),
    );

    const user = await this.userRepository.create(request);

    const { password, ...rest } = user;

    return { user: rest };
  }
}
