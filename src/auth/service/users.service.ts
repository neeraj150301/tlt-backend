import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePinDto } from '../dto/update-pin.dto';
import { User } from '../schemas/user.schema';
import { Socket } from 'socket.io';
import { UpdateFcmTokenDto } from '../dto/update-fcm-token.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserAppDto } from '../dto/update-user-app.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'auth')
    private userSchema: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
   
    // createUserDto.apps = ['hr'];
    const user = await this.userSchema.create(createUserDto);
    let useruse = await user.save();
    return useruse;
  }

  findAll() {
    return this.userSchema.find(
      {},
      '_id phoneNumber fullName isActive isDefaultPin devices deviceHistory createdAt updatedAt apps fcmToken',
    );
  }

  async findOne(id: String) {
    return await this.userSchema.findById(
      id,
      '_id phoneNumber fullName isActive isDefaultPin isSuperAdmin apps devices deviceHistory createdAt updatedAt fcmToken',
    );
  }

  async findByPhoneNumber(phoneNumber: string) {
    return this.userSchema.findOne({
      phoneNumber: phoneNumber,
      isActive: true,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userSchema.findByIdAndUpdate(id, updateUserDto);
  }

  async addDevice(id: string, deviceName: string) {
    await this.userSchema.updateOne(
      { _id: id, deviceHistory: { $ne: deviceName } },
      { $push: { deviceHistory: deviceName } },
    );
  }

  async updatePin(id: string, updatePinDto: UpdatePinDto) {
    const saltOrRounds = 10;
    const password = updatePinDto.pin;
    const salt = await bcrypt.genSalt(saltOrRounds);
    var hashValue = await bcrypt.hash(password, salt);
    return await this.userSchema.findByIdAndUpdate(id, {
      $set: { pin: hashValue, isDefaultPin: false },
    });
  }

  async resetPin(id: string) {
    const saltOrRounds = 10;
    const password = '290122';
    const salt = await bcrypt.genSalt(saltOrRounds);
    var hashValue = await bcrypt.hash(password, salt);

    return await this.userSchema.findByIdAndUpdate(id, {
      $set: { pin: hashValue, isDefaultPin: true },
    });
  }

  async setSuperAdmin(id: string) {
    return await this.userSchema.findByIdAndUpdate(id, {
      $set: { isSuperAdmin: true },
    });
  }

  async removeSuperAdmin(id: string) {
    return await this.userSchema.findByIdAndUpdate(id, {
      $set: { isSuperAdmin: false },
    });
  }

  async updateFcmToken(updateFcmTokenDto: UpdateFcmTokenDto) {
    return await this.userSchema.findByIdAndUpdate(updateFcmTokenDto.uid, {
      $set: {
        fcmToken: updateFcmTokenDto.fcmToken,
      },
    });
  }

  async updateUserApps(id: String, updateUserAppDto: UpdateUserAppDto) {
    return await this.userSchema.findByIdAndUpdate(id, {
      $set: {
        apps: updateUserAppDto.apps,
      },
    });
  }

  async subscribeSocket(socket: Socket, user: User) {
    // await this.socketConnectionService.create(socket, user);
    return socket.join(`user_${user._id}`);
  }
  async unsubscribeSocket(socket: Socket, user: User) {
    // await this.socketConnectionService.delete(socket);
    return socket.leave(`user_${user._id}`);
  }
}
