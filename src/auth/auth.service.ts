import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: AuthDto): Promise<User> {
    const user: User = await this.userService.findOne(dto.email);
    if (user?.password === dto.password) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7 days' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
}
