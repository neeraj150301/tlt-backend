import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateTltRmDto } from './dto/create-tlt-rm.dto';
import { UpdateTltRmDto } from './dto/update-tlt-rm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TltRm } from './schema/tlt-rm.schema';
import { Model } from 'mongoose';
import { TltRmItem } from 'src/rm-item/schema/rm-item.schema';
import { TltRmIssue } from 'src/rm-issue/schema/rm-issue.schema';

@Injectable()
export class TltRmsService {
  constructor(
    @InjectModel(TltRm.name, 'tlt')
    private tltRmSchema: Model<TltRm>,
    @InjectModel(TltRmItem.name, 'tlt')
    private readonly tltItemSchema: Model<TltRmItem>,
    @InjectModel(TltRmIssue.name, 'tlt')
    private readonly tltIssueSchema: Model<TltRmIssue>,
  ) {}
  async create(createTltRmDto: CreateTltRmDto) {
    var rmItem = await this.tltRmSchema.create({
      pgNonPg: createTltRmDto.pgNonPg,
      warehouse: createTltRmDto.warehouse,
      documentNo: createTltRmDto.documentNo, 
      documentDate: createTltRmDto.documentDate,
      vendorName: createTltRmDto.vendorName,
      itemName: createTltRmDto.itemName,
      unit: createTltRmDto.unit,
      receivedPieces: createTltRmDto.receivedPieces,
      receivedQuantity: createTltRmDto.receivedQuantity,
      issuedPieces: createTltRmDto.issuedPieces,
      issuedQuantity: createTltRmDto.issuedQuantity,
      balancePieces: createTltRmDto.balancePieces,
      balanceQuantity: createTltRmDto.balanceQuantity,
      balanceAmount: createTltRmDto.balanceAmount,
      pendingDays: createTltRmDto.pendingDays,
      maxLength: createTltRmDto.maxLength,
      minLength: createTltRmDto.minLength,
      averageLength: createTltRmDto.averageLength,
      length: createTltRmDto.length,
      width: createTltRmDto.width,
      costCenter: createTltRmDto.costCenter,
      section: createTltRmDto.section,
      createdBy: createTltRmDto.createdBy,
      itemId: createTltRmDto.itemId,
    })
    var itemModel = await this.tltItemSchema.findById(createTltRmDto.itemId, );
    await this.tltItemSchema.findByIdAndUpdate(rmItem.itemId,{ stockAmount: (itemModel.stockAmount + rmItem.receivedQuantity) },)
    return await rmItem.save();
  }
  

  async findAll() {
    var findRm = await this.tltRmSchema.find().sort({createdAt:-1});

    return findRm;
  }

  async findOne(id: string) {
    return await this.tltRmSchema.findById(id);
  }

  async update( updateTltRmDto: any) {
    var returnValue:TltRm;
    returnValue = await this.tltRmSchema.findByIdAndUpdate(updateTltRmDto.id, updateTltRmDto)
    return returnValue;
  }

  async issue( updateTltRmDto: any) {
    // console.log(updateTltRmDto);
    var returnValue:TltRm;
    var oldStockValue = await this.tltRmSchema.findById(updateTltRmDto._id)
    // console.log(oldStockValue);

    returnValue = await this.tltRmSchema.findByIdAndUpdate(updateTltRmDto._id, updateTltRmDto)

   await this.tltIssueSchema.create({
      issuedDocumentId:updateTltRmDto._id,
      issuedItemId: updateTltRmDto.itemId,
      issuedItemCount:oldStockValue.balancePieces - updateTltRmDto.balancePieces,
      issuedItemWeight:oldStockValue.balanceQuantity - updateTltRmDto.balanceQuantity,
      issuedBy: updateTltRmDto.createdBy
    })
    var itemModel = await this.tltItemSchema.findById(updateTltRmDto.itemId, );
   await this.tltItemSchema.findByIdAndUpdate(updateTltRmDto.itemId,{ stockAmount: (itemModel.stockAmount - (oldStockValue.balanceQuantity - updateTltRmDto.balanceQuantity)) },);
    return returnValue;
  }

  remove(id: number) {
    return `This action removes a #${id} tltRm`;
  }
}
