import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}
