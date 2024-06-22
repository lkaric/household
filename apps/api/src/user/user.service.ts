import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { plainToInstance } from 'class-transformer';
import { UserDto, UserResponseDto } from './dto';

@Injectable()
class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly logger = new Logger(UserService.name);

  async getUserById(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: id },
        include: {
          households: {
            include: {
              household: true, // Include details of the household
            },
          },
          createdItems: true,
          assignedItems: true,
        },
      });
      console.log(user);
      return plainToInstance(UserDto, user);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
export { UserService };
