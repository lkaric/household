import { Body, Controller, Post, HttpStatus, Put, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

import { CurrentUser } from '../iam/auth/decorators';
import { CurrentUserData } from '../iam/auth/interfaces';

import { HouseholdService } from './household.service';

import { CreateHouseholdRequest, CreateHouseholdResponse, UpdateHouseholdRequest } from './dto';

@ApiTags('Household')
@ApiBearerAuth('JWT')
@Controller('household')
export class HouseholdController {
  constructor(private readonly householdService: HouseholdService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: CreateHouseholdResponse })
  @Post()
  create(
    @Body() body: CreateHouseholdRequest,
    @CurrentUser() cu: CurrentUserData
  ): Promise<CreateHouseholdResponse> {
    return this.householdService.create(body, cu);
  }
  @ApiResponse({status:HttpStatus.CREATED,type:UpdateHouseholdRequest  })
  @Put("/:id")
  @ApiParam({name:"id",required:true,description:"household id please"})
  update(
    @Param() { id },
    @Body() body: UpdateHouseholdRequest,
  ):Promise<CreateHouseholdResponse>{
    return  this.householdService.update(body,id);
  }
  

}
