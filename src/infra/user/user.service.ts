import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'antony',
      password: '10203040',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
