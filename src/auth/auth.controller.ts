import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: Req) {
    const tokens = await this.authService.login(req.user);
    return {
      message: "You've logged in successfully",
      statusCode: HttpStatus.OK,
      tokens,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedData(@Request() req: Req) {
    return {
      message: "You've accessed a protected data successfully",
      statusCode: HttpStatus.OK,
      user: req.user,
    };
  }
}
