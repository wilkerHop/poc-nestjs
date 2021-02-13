import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.userService.user({ username });
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
  }
}
