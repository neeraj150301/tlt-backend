import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TltUserService } from './tlt-user.service';
import { CreateTltUserDto } from './dto/create-tlt-user.dto';
import { UpdateTltUserDto } from './dto/update-tlt-user.dto';

@Controller('/tlt-user')
export class TltUserController {
  constructor(private readonly tltUserService: TltUserService) {}

  @Post()
  create(@Body() createTltUserDto: CreateTltUserDto) {
    console.log(createTltUserDto);
    return this.tltUserService.create(createTltUserDto);
    //  return {"msg" :"hello"};
  }

  @Get()
 async findAll() {
    var tltUserList = await this.tltUserService.findAll();
    
    return tltUserList;
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    var tltUserList = await this.tltUserService.findOne(id);
    return tltUserList;
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTltUserDto: UpdateTltUserDto) {
    var tltUser = this.tltUserService.update(id, updateTltUserDto);
    return tltUser;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tltUserService.remove(id);
  }
}
