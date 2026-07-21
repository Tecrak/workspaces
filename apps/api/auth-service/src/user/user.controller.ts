import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.create({
      email,
      password,
    });
  }
}
