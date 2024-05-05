import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User = await this.userService.findOne(email);
    if (user?.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7 days' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
}
