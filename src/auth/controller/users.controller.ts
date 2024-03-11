import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ParseFloatPipe, Req } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePinDto } from '../dto/update-pin.dto';
import { UsersService } from '../service/users.service';
import { UpdateFcmTokenDto } from '../dto/update-fcm-token.dto';
import { UpdateUserAppDto } from '../dto/update-user-app.dto';

@Controller('/api/auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Req() request:Request) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id')  id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('/reset/:id')
  resetPin(@Param('id') id: string) {    
    return this.usersService.resetPin(id);
  }

  @Patch('/setsuperadmin/:id')
  setSuperAdmin(@Param('id') id: string) {    
    return this.usersService.setSuperAdmin(id);
  }

  @Patch('/pin/:id')
  updatePin(@Param('id')  id: string, @Body() updatePinDto: UpdatePinDto) {
    return this.usersService.updatePin(id, updatePinDto);
  }

  @Patch('/apps/:id')
  updateUserApps(@Param('id')  id: string, @Body() updateUserAppDto: UpdateUserAppDto) {
    return this.usersService.updateUserApps(id, updateUserAppDto);
  }

  @Post('token')
  updateNotificationToken(@Body() fcmTokenDto: UpdateFcmTokenDto) {
    return this.usersService.updateFcmToken(fcmTokenDto);
  }

}
