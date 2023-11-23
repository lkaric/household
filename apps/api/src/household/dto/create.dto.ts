import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

class CreateHouseholdRequest {
  @ApiProperty({ description: 'Household Name', example: "Lazar's Household" })
  @IsString()
  name: string;
}

class CreateHouseholdResponse {
  @ApiProperty({ description: 'ID' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Image URL' })
  @IsString()
  @IsOptional()
  image: string;
}
class UpdateHouseholdRequest extends PartialType(CreateHouseholdRequest){

}
class InviteHouseholdRequest{
  @ApiProperty({ description: 'Email', example: 'ivanstojkovic@ivan.com' })
  @IsEmail()
  email:string;
}
interface RedisInv{
  id:string,
  email:string
}

export { CreateHouseholdRequest, CreateHouseholdResponse,UpdateHouseholdRequest,InviteHouseholdRequest,RedisInv};
