import { Injectable } from '@nestjs/common';
import { CreateRmItemDto } from './dto/create-rm-item.dto';
import { UpdateRmItemDto } from './dto/update-rm-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TltRmItem } from './schema/rm-item.schema';
import { Model } from 'mongoose';

@Injectable()
export class RmItemService {
constructor(
  @InjectModel(TltRmItem.name , 'tlt')
  private tltRmItemSchema: Model<TltRmItem>
){}
  async create(createRmItemDto: CreateRmItemDto) {
    var rmItem = await this.tltRmItemSchema.create(createRmItemDto);
    return rmItem.save();
  }

 async findAll() {
    return await this.tltRmItemSchema.find().sort({createdAt:-1});
  }

  async findOne(id: string) {
    return await this.tltRmItemSchema.findById(id);
  }

  async update(id: string, updateRmItemDto: UpdateRmItemDto) {
    const applyUpdate = await this.tltRmItemSchema.findByIdAndUpdate(id , updateRmItemDto)
    return applyUpdate;
  }

  remove(id: number) {
    return `This action removes a #${id} rmItem`;
  }
}
