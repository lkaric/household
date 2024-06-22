import { Household, HouseholdRole, Item, User } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

class HousholdUserDto {
  household: Household;
  user: User;
  role: HouseholdRole;
}
class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  phone?: string;

  @Expose()
  @IsBoolean()
  emailVerified: boolean;

  @Expose()
  @IsBoolean()
  phoneVerified: boolean;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
  @Expose()
  households: HousholdUserDto[];

  createdItems: Item[];
}
class UserResponseDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  phone?: string;
  @Expose()
  households: HousholdUserDto[];

  createdItems: Item[];
}
export { HousholdUserDto, UserDto, UserResponseDto };
