import { IsEmail, IsString, IsPhoneNumber, IsOptional } from 'class-validator';

import { Prisma } from '@prisma/client';

class RegisterRequest implements Prisma.UserCreateInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export { RegisterRequest };
