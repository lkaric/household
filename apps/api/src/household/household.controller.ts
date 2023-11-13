import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from '../iam/auth/decorators';
import { CurrentUserData } from '../iam/auth/interfaces';

import { HouseholdService } from './household.service';

import { CreateHouseholdRequest, CreateHouseholdResponse } from './dto';

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
}
