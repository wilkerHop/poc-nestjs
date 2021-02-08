import { IsAlphanumeric, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsAlphanumeric()
  username: string;

  @IsOptional()
  @IsString()
  password: string;
}
