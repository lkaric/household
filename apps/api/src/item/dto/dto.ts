import {
  IsDate,
  IsString,
  IsEnum,
  ValidateNested,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Household, ItemType, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

class ItemDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ItemType)
  type: ItemType;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsUUID()
  createdById: string;

  @IsUUID()
  assignedToId: string;

  @IsUUID()
  householdId: string;

  @ValidateNested()
  createdBy: User;

  @ValidateNested()
  assignedTo: User;

  @ValidateNested()
  household: Household;
}
class CreateItemDto {
  @ApiProperty({
    description: 'Name of the item',
    type: String,
    example: 'Kitchen Knife',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the item',
    type: String,
    example: 'A sharp knife used for chopping vegetables',
    required: false,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Type of the item',
    enum: ItemType,
    example: ItemType.ITEM_CHORE,
  })
  @IsEnum(ItemType)
  type: ItemType;

  @ApiProperty({
    description: 'ID of the household to which the item belongs',
    type: String,
    example: 'clxugwyop000110dhqo9lxqbw',
  })
  @IsString()
  householdId: string;
}
class AssignItemDto {
  @ApiProperty({
    description: 'ID of the item',
    type: String,
    example: 'clxuheawc00017iyw6c876gsp',
  })
  @IsString()
  itemId: string;

  @ApiProperty({
    description: 'ID of the user',
    type: String,
    example: 'clxuic6pd0000c78m8bcerxiz',
  })
  @IsString()
  userId: string;
}
export { ItemDto, CreateItemDto, AssignItemDto };
