import { IsAlphanumeric, IsString } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  username: string;

  @IsString()
  password: string;
}
