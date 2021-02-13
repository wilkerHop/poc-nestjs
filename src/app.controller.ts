import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { IncomingMessage } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHello(): string {
    return this.appService.getHealth();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: IncomingMessage & { user: User }) {
    return req.user;
  }
}
