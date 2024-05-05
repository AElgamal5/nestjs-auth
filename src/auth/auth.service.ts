import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User = await this.userService.findOne(email);
    if (user?.password === password) {
      return user;
    }
    return null;
  }
}
