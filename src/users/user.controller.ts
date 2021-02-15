import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { IncomingMessage } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user).catch((e: Error) => {
      if (e.message.includes('username_unique')) {
        throw new BadRequestException('Username already taken');
      }

      throw new InternalServerErrorException(e.message);
    });
  }

  @Get()
  list() {
    return this.usersService.users({});
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: IncomingMessage & { user: User }) {
    return req.user;
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return this.usersService.user({ username }).catch((e: Error) => {
      if (e.message === 'User not found') {
        throw new NotFoundException(e.message);
      }

      throw new InternalServerErrorException(e.message);
    });
  }

  @Put(':username')
  updateUser(@Param('username') username: string, @Body() data: UpdateUserDto) {
    return this.usersService
      .updateUser({ where: { username }, data })
      .catch((e: Error) => {
        if (e.message.includes('username_unique')) {
          throw new BadRequestException('Username already taken');
        }

        if (e.message === 'User not found') {
          throw new NotFoundException(e.message);
        }

        throw new InternalServerErrorException(e.message);
      });
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('username') username: string) {
    return this.usersService.deleteUser({ username }).catch((e: Error) => {
      if (e.message.includes('RecordNotFound')) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(e.message);
    });
  }
}
