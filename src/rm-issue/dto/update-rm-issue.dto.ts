import { PartialType } from '@nestjs/mapped-types';
import { CreateRmIssueDto } from './create-rm-issue.dto';

export class UpdateRmIssueDto extends PartialType(CreateRmIssueDto) {
 
  id: string;
  issueItem: string;
  vendorName: string;
  issueStock: string;
  createdBy: string;
  createdAt: Date;
}
