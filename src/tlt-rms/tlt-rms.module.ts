import { Module } from '@nestjs/common';
import { TltRmsService } from './tlt-rms.service';
import { TltRmsController } from './tlt-rms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TltRm, TltRmSchema } from './schema/tlt-rm.schema';
import { RmItemModule } from 'src/rm-item/rm-item.module';
import { TltRmIssue, TltRmIssueSchema } from 'src/rm-issue/schema/rm-issue.schema';

@Module({
  imports: [

    MongooseModule.forFeature(
      [{ name: TltRm.name, schema: TltRmSchema }],
      'tlt',
    ),
    MongooseModule.forFeature(
      [{ name: TltRmIssue.name, schema: TltRmIssueSchema }],
      'tlt',
    ),
    RmItemModule,
  ],
  controllers: [TltRmsController],
  exports: [MongooseModule, TltRmsService],
  providers: [TltRmsService],
})
export class TltRmsModule {}
