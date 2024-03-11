import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards , HostParam, Req} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto, @Req() request:Request) {
    return this.authService.signIn(signInDto.phoneNumber, signInDto.pin, request);
  }
  
  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
