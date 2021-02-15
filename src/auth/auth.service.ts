import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.user({ username });

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
  }

  async login({ username, password }: User) {
    const user = await this.validateUser(username, password);

    const payload = { ...user, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
