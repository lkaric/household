import { IsEmail, IsString } from 'class-validator';

class LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export { LoginRequest };
