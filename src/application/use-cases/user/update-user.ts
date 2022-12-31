import { UserRepository } from '@application/repositories';
import { UserCreateInput } from '@infra/database/typeorm/entities';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface UpdateUserRequest {
  userId: number;
  data: Partial<UserCreateInput>;
}

type UpdateUserResponse = void;

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    if (request.data.password) {
      request.data.password = bcrypt.hashSync(
        request.data.password,
        bcrypt.genSaltSync(10),
      );
    }

    await this.userRepository.save(request.userId, request.data);
  }
}
