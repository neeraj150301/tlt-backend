import { Module } from '@nestjs/common';
import { RmIssueService } from './rm-issue.service';
import { RmIssueController } from './rm-issue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TltRmIssue, TltRmIssueSchema } from './schema/rm-issue.schema';
import { RmItemModule } from 'src/rm-item/rm-item.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: TltRmIssue.name, schema: TltRmIssueSchema }],
      'tlt',
    ),
    RmItemModule,
  ],

  controllers: [RmIssueController],
  providers: [RmIssueService],
  exports : [MongooseModule, ],
})
export class RmIssueModule {}
