import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guards';

@Controller('auth')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(
    @Request() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accesToken, userId, userEmail } = await this.authService.signIn(
      request.user,
    );

    response.cookie('accessToken', accesToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { userId, userEmail };
  }

  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    return { message: 'Logged out' };
  }
}
