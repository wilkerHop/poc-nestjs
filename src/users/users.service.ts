import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './interfaces/User';

@Injectable()
export class UsersService {
  private users: Record<string, User> = {};

  async createUser(user: CreateUserDto) {
    if (this.users[user.username]) {
      throw new Error('Username already taken');
    }

    this.users[user.username] = {
      ...user,
      id: Object.keys(this.users).length + 1,
    };
  }

  list() {
    return Object.values(this.users);
  }

  async getUser(username: string) {
    const user = this.users[username];

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async updateUser(username: string, params: Partial<User>) {
    const user = await this.getUser(username);

    if (this.users[params.username]) {
      throw new Error('Username already taken');
    }

    Object.assign(user, params);
    delete this.users[username];
    this.users[user.username] = user;
  }

  async deleteUser(username: string) {
    await this.getUser(username);

    delete this.users[username];
  }
}
