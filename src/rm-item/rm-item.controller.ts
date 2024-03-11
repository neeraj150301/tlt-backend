import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RmItemService } from './rm-item.service';
import { CreateRmItemDto } from './dto/create-rm-item.dto';
import { UpdateRmItemDto } from './dto/update-rm-item.dto';

@Controller('/rm-item')
export class RmItemController {
  constructor(private readonly rmItemService: RmItemService) {}

  @Post()
 async create(@Body() createRmItemDto: CreateRmItemDto) {
    var rmItem = await this.rmItemService.create(createRmItemDto) ;
    return rmItem  ;
  }

  @Get()
  async findAll(client: any , payload: any ) {
    var TltRmVendor = await this.rmItemService.findAll();
    return TltRmVendor;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rmItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRmItemDto: UpdateRmItemDto) {
    return this.rmItemService.update(id, updateRmItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rmItemService.remove(+id);
  }
}

function MessageBody(): (target: RmItemController, propertyKey: "create", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}
// function MessageBody(): (target: RmItemController, propertyKey: "create", parameterIndex: 0) => void {
//   throw new Error('Function not implemented.');
// }

