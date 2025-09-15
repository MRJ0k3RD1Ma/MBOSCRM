import { PartialType } from '@nestjs/swagger';
import { CreatePaidCrmDto } from './create-paid-crm.dto';

export class UpdatePaidCrmDto extends PartialType(CreatePaidCrmDto) {}
