import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

type CreateUserRequest = Prisma.UserCreateInput;

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userRepository.create(request);

    return { user };
  }
}
