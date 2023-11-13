import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma';
import { CurrentUserData } from '../iam/auth/interfaces';

import { CreateHouseholdRequest, CreateHouseholdResponse, UpdateHouseholdRequest } from './dto';

@Injectable()
class HouseholdService {
  private readonly logger = new Logger(HouseholdService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: CreateHouseholdRequest,
    cu: CurrentUserData
  ): Promise<CreateHouseholdResponse> {
    try {
      const household = await this.prismaService.household.create({
        data: {
          name: data.name,
          createdBy: cu.sub,
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      await this.prismaService.householdUser.create({
        data: { userId: cu.sub, householdId: household.id },
      });

      return household;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }



  async update(
    data: UpdateHouseholdRequest,
    householdId: string
  ):Promise<CreateHouseholdResponse>{

    const household = await this.prismaService.household.update({
      where :{id:householdId},
      data:data

    })
    return household;
  }
}

export { HouseholdService };
