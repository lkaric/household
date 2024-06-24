import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Household, HouseholdRole, Item, User } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

class HouseholdUserDto {
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
  households: HouseholdUserDto[];

  createdItems: Item[];
}
class UserResponseDto {
  @Expose()
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @Expose()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The phone number of the user',
    example: '+1234567890',
  })
  phone?: string;

  @Expose()
  @ApiProperty({
    type: [HouseholdUserDto],
    description: 'The households associated with the user',
  })
  households: HouseholdUserDto[];

  @Expose()
  @ApiProperty({
    description: 'The items created by the user',
  })
  createdItems: Item[];
}
export { HouseholdUserDto, UserDto, UserResponseDto };
