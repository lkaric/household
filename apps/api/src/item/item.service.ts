import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { AssignItemDto, CreateItemDto } from './dto';
import { CurrentUserData } from '../iam/auth/interfaces';

@Injectable()
export class NewService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(NewService.name);

  async createItem(createItemDto: CreateItemDto, cu: CurrentUserData) {
    try {
      const { name, description, householdId } = createItemDto;
      const type = 'ITEM_CHORE';
      const it = await this.prismaService.item.create({
        data: {
          name: name,
          description: description,
          type: type,
          createdById: cu.sub,
          assignedToId: cu.sub,
          householdId: householdId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      return it;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
  async assignItem(assignItemDto: AssignItemDto) {
    const userId = assignItemDto.userId;
    const itemId = assignItemDto.itemId;

    try {
      return await this.prismaService.item.update({
        where: { id: itemId },
        data: {
          assignedToId: userId,
        },
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
