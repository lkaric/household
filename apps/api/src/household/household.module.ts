import { Module } from '@nestjs/common';

import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';

@Module({
  imports: [],
  controllers: [HouseholdController],
  providers: [HouseholdService],
})
export class HouseholdModule {}
