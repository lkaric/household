import {
  Controller,
  Post,
  Put,
  Body,
  HttpStatus,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from '../iam/auth/decorators';
import { AssignItemDto, CreateItemDto } from './dto';
import { CurrentUserData } from '../iam/auth/interfaces';
import { NewService } from './item.service';

@ApiTags('Item')
@ApiBearerAuth('JWT')
@Controller('item')
export class ItemController {
  constructor(private readonly newService: NewService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() cu: CurrentUserData
  ) {
    return this.newService.createItem(createItemDto, cu);
  }

  @Put('/assign')
  async updateItem(@Body() updateItemDto: AssignItemDto) {
    return this.newService.assignItem(updateItemDto);
  }
  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'item id please' })
  async deleteItem(@Param('id') id: string): Promise<void> {
    const deleted = await this.newService.deleteItem(id);
    if (!deleted) {
      throw new NotFoundException('Item not found');
    }
  }
}