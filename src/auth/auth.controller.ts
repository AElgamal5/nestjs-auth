import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: Req, @Body() dto: AuthDto) {
    const user = await this.authService.validateUser(dto);
    const tokens = await this.authService.login(user);
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
