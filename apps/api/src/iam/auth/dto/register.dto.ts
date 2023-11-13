import { IsEmail, IsString, IsPhoneNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';

import { TokenPair } from '../interfaces';

class RegisterRequest implements Prisma.UserCreateInput {
  @ApiProperty({ description: 'Email', example: 'hi@lazar.sh' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', example: 'topsecret' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'First Name', example: 'Lazar' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last Name', example: 'Karic' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Phone',
    example: '+381641384317',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

class RegisterResponse implements TokenPair {
  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;
}

export { RegisterRequest, RegisterResponse };
