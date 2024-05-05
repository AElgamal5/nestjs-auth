import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Amir', email: 'amir@test.com', password: 'amir@123' },
    { id: 2, name: 'Samir', email: 'samir@test.com', password: 'samir@123' },
  ];

  async findOne(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}
