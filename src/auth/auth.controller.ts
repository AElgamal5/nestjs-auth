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
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login() {
    return {
      message: "You've logged in successfully",
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  protectedData(@Request() req: Req) {
    return {
      message: "You've accessed a protected data successfully",
      statusCode: HttpStatus.OK,
      user: req.user || 'You are not authenticated',
    };
  }
}
