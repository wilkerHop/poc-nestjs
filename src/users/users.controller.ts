import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './User.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: User) {
    this.usersService.createUser(user).catch((e: Error) => {
      if (e.message === 'Username already taken') {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Get()
  list() {
    return this.usersService.list();
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.getUser(username).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  @Put(':username')
  updateUser(@Param('username') username: string, @Body() params: User) {
    console.log({ username, params });

    return this.usersService.updateUser(username, params).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
