import { Controller, Get, Request, Post, HttpCode } from '@nestjs/common';
import { User } from '@prisma/client';
import { IncomingMessage } from 'http';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('health')
  getHello(): string {
    return this.appService.getHealth();
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Request() req: IncomingMessage & { body: User }) {
    return this.authService.login(req.body);
  }
}
