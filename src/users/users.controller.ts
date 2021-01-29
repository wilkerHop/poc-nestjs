import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

interface User {
  username: string;
  password: string;
}

@Controller('users')
export class UsersController {
  private users: Record<string, User> = {};

  @HttpCode(201)
  @Post()
  create(@Body() user: User) {
    console.log(user);

    if (this.users[user.username]) {
      throw new Error('Username already taken');
    }

    this.users[user.username] = user;
  }

  @Get()
  list() {
    console.log(this.users);
    return Object.values(this.users);
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    console.log(username);

    return this.users[username];
  }
}
