import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma';
import { CurrentUserData } from '../iam/auth/interfaces';

import {
  CreateHouseholdRequest,
  CreateHouseholdResponse,
  InviteHouseholdRequest,
  UpdateHouseholdRequest,
} from './dto';
import * as crypto from 'crypto';
import { RedisService } from '../redis';
import { equal } from 'assert';

@Injectable()
class HouseholdService {
  private readonly logger = new Logger(HouseholdService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {}

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
  ): Promise<CreateHouseholdResponse> {
    const household = await this.prismaService.household.update({
      where: { id: householdId },
      data: data,
    });
    return household;
  }

  async invite(cu: CurrentUserData, inv: InviteHouseholdRequest, id: string) {
    //insert inv token in redis
    const token = crypto.randomBytes(64).toString('hex');
    let redisInv = {
      id: id,
      email: inv.email,
    };
    await this.redisService.insertExpire(
      token,
      JSON.stringify(redisInv),
      86400
    );

    //send email with url
    return { value: await this.redisService.get(token), token: token };
  }

  async handleInvite(
    cu: CurrentUserData,
    accept: string,
    id: string,
    token: string
  ) {
    let redisExpected = JSON.stringify({
      id: id,
      email: cu.email,
    });
    if (this.compareToken(id, cu.email, token) && accept == 'accept') {
      //create householdUser and assign user and household to it
      let ressponse = this.addUser(cu.email, id);

      return ressponse;
    } else {
      return 'no';
    }
  }
  private async compareToken(
    id: string,
    email: string,
    token: string
  ): Promise<boolean> {
    let redisExpected = JSON.stringify({
      id: id,
      email: email,
    });
    return await this.redisService.areStringsEqual(token, redisExpected);
  }
  async addUser(email: string, id: string) {
    let user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    return await this.prismaService.householdUser.create({
      data: {
        householdId: id,
        userId: user.id,
      },
    });
  }
  async addUserFromToken(token: string, email: string) {
    let data = JSON.parse(await this.redisService.get(token));
    if (data.email == email) {
      return await this.addUser(data.email, data.id);
    }
  }
}

export { HouseholdService };
