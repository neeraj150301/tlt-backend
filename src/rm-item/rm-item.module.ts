import { Module } from '@nestjs/common';
import { RmItemService } from './rm-item.service';
import { RmItemController } from './rm-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TltRmItem, TltRmItemSchema } from './schema/rm-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TltRmItem.name , schema: TltRmItemSchema}], 'tlt')
  ],
  controllers: [RmItemController],
  exports: [MongooseModule, RmItemService],
  providers: [RmItemService],
})
export class RmItemModule {}
