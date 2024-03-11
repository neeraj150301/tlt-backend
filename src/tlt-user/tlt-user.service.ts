import { Injectable } from '@nestjs/common';
import { CreateTltUserDto } from './dto/create-tlt-user.dto';
import { UpdateTltUserDto } from './dto/update-tlt-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TltUser } from './schema/tlt-user.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/auth/service/users.service';

@Injectable()
export class TltUserService {
  constructor(
    @InjectModel(TltUser.name, 'tlt')
    private tltUserSchema: Model<TltUser>,
    private readonly usersService: UsersService,
 
  ) {}
  async create(createTltUserDto: CreateTltUserDto) {
    var auth = await this.usersService.findOne(createTltUserDto.id);

    var user = await this.tltUserSchema.create({
      _id: createTltUserDto.id,
      userType: createTltUserDto.userType,
      division: createTltUserDto.division,
    });
    return await user.save();
  }

  async findAll() {
    var user = await this.tltUserSchema.find();
    return user;
  }

  async findOne(id: string) {
    return await this.tltUserSchema.findById(id);  }

  async update(id: string, updateTltUserDto: UpdateTltUserDto) {
    var tltUser = await this.tltUserSchema.findByIdAndUpdate(
      updateTltUserDto.id,
      { userType: updateTltUserDto.userType, division: updateTltUserDto.division },
    );
    return tltUser;  }

    async remove(id: string) {
     var user = await this.tltUserSchema.findByIdAndDelete(id);
      return user;
    }
}
