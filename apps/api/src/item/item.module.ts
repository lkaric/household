import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { NewService } from './item.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [NewService],
})
export class ItemModule {}
