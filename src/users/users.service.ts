import { Injectable } from '@nestjs/common';
import { User } from './User.model';

@Injectable()
export class UsersService {
  private users: Record<string, User> = {};

  async createUser(user: User) {
    if (this.users[user.username]) {
      throw new Error('Username already taken');
    }

    this.users[user.username] = user;
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

  async updateUser(username: string, params: User) {
    const user = await this.getUser(username);

    if (this.users[params.username]) {
      throw new Error('Username already taken');
    }

    Object.assign(user, params);
    delete this.users[username];
    Object.assign(this.users, { [user.username]: user });
  }
}
