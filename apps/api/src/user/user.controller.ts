import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto } from './dto';
import { Public } from '../iam/auth/decorators';

@ApiTags('User')
@ApiBearerAuth('JWT')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', required: true, description: 'user id please' })
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.getUserById(id);
  }
}
