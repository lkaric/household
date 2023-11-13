import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TokenPair } from '../interfaces';

class LoginRequest {
  @ApiProperty({ description: 'Email', example: 'hi@lazar.sh' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: 'topsecret' })
  @IsString()
  password: string;
}
class LoginResponse implements TokenPair {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}

export { LoginRequest, LoginResponse };
