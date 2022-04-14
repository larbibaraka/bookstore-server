import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
