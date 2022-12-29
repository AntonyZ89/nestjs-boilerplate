import { UserRepository } from '@application/repositories';
import { User } from '@infra/database/typeorm/entities';
import { UserDTO } from '@infra/http/dtos';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type CreateUserRequest = Required<Pick<User, 'username' | 'password'>>;

interface CreateUserResponse {
  user: UserDTO;
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

    return { user };
  }
}
