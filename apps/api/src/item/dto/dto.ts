import {
  IsDate,
  IsString,
  IsEnum,
  ValidateNested,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Household, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
enum ItemType {
  ITEM_CHORE,
  ITEM_TO_BUY,
}
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
    format: 'uuid',
    example: 'clxrqmkws0000i0kr074i48ik',
  })
  householdId: string;
}
class AssignItemDto {
  @IsString()
  @IsUUID()
  itemId: string;

  @IsString()
  @IsUUID()
  userId: string;
}
export { ItemDto, CreateItemDto, ItemType, AssignItemDto };
