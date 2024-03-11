import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RmIssueService } from './rm-issue.service';
import { CreateRmIssueDto } from './dto/create-rm-issue.dto';
import { UpdateRmIssueDto } from './dto/update-rm-issue.dto';

@Controller('/rm-issue')
export class RmIssueController {
  constructor(private readonly rmIssueService: RmIssueService) {}

  @Post()
  async create(@Body() createRmIssueDto: CreateRmIssueDto) {
    var TltRmIssue = this.rmIssueService.create(createRmIssueDto);
   return TltRmIssue; 
  }

  @Get()
  findAll() {
    return this.rmIssueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rmIssueService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRmIssueDto: UpdateRmIssueDto) {
    return this.rmIssueService.update(id, updateRmIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rmIssueService.remove(id);
  }
}
