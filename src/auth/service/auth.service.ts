import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/auth/service/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    phoneNumber: string,
    pin: string,
    request: Request,
  ): Promise<any> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const isPasswordMatched = await bcrypt.compare(pin, user.pin);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Incorrect pin or password');
    }
      // Check if "tlt" is in the apps array
      const hasTLTApp = user.apps.includes('tlt');

      if (!hasTLTApp) {
        throw new UnauthorizedException('User does not have access to sign in');
      }
      
    // this.usersService.addDevice(user.id, request.headers['user-agent']);
    const token = this.jwtService.sign({ id: user._id });
    return {
      success: true,
      token: token,
      id: user._id,
      msg: 'Login Successful',
    };
  }
}
