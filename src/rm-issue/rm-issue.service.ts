import { Injectable } from '@nestjs/common';
import { CreateRmIssueDto } from './dto/create-rm-issue.dto';
import { UpdateRmIssueDto } from './dto/update-rm-issue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TltRmIssue } from './schema/rm-issue.schema';
import { Model } from 'mongoose';
import { RmItemService } from 'src/rm-item/rm-item.service';
import { UpdateRmItemDto } from 'src/rm-item/dto/update-rm-item.dto';

@Injectable()
export class RmIssueService {
  constructor(
    @InjectModel(TltRmIssue.name, 'tlt')
    private tltRmIssueSchema: Model<TltRmIssue>,
    private readonly rmItemService: RmItemService,
  ) {}
  async create(createRmIssueDto: CreateRmIssueDto) {
    let updateRmItemDto: UpdateRmItemDto = new UpdateRmItemDto();
    var rmItemcheck = await this.rmItemService.findOne(
      createRmIssueDto.issueItem,
    );
    if (rmItemcheck == null) {
      return 'item not found';
    } else {
      var count =
        Number(rmItemcheck.stockAmount) + Number(createRmIssueDto.issueStock);
      if (count >= 0) {
        var rmItem = await this.tltRmIssueSchema.create(createRmIssueDto);
        await rmItem.save();

        updateRmItemDto.stock = count.toString();
        await this.rmItemService.update(
          createRmIssueDto.issueItem,
          updateRmItemDto,
        );
        return 'found';
      } else {
        return 'more the stock';
      }
    }
    
  }

  async findAll() {
    return await this.tltRmIssueSchema.find().sort({createdAt:-1});

  }

  async findOne(id: string) {
    return await this.tltRmIssueSchema.findById(id);
  }

  update(id: string, updateRmIssueDto: UpdateRmIssueDto) {
    return `This action updates a #${id} rmIssue`;
  }

  remove(id: string) {
    return `This action removes a #${id} rmIssue`;
  }
}
