import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TltRmsService } from './tlt-rms.service';
import { CreateTltRmDto } from './dto/create-tlt-rm.dto';
import { UpdateTltRmDto } from './dto/update-tlt-rm.dto';

@Controller('/tlt-rms')
export class TltRmsController {
  constructor(private readonly tltRmsService: TltRmsService) {}

  @Post()
  create(@Body() createTltRmDto: CreateTltRmDto) {
    return this.tltRmsService.create(createTltRmDto);
  }

  @Get()
  findAll() {
    return this.tltRmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tltRmsService.findOne(id);
  }
  
  @Post('/issue')
  async issue(@Body() updateTltRmDto: any) {
    // console.log(updateTltRmDto);
    return this.tltRmsService.issue(updateTltRmDto);
  }

  @Patch(':id')
  async update(@Param('id') updateTltRmDto: any) {
    return this.tltRmsService.update( updateTltRmDto);
  
    // var updatedTltRm = await this.tltRmsService.issue( updateTltRmDto)
    // return updatedTltRm;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tltRmsService.remove(+id);
  }
}
