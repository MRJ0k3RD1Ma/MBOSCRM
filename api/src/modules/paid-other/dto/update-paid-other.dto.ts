import { PartialType } from '@nestjs/swagger';
import { CreatePaidOtherDto } from './create-paid-other.dto';

export class UpdatePaidOtherDto extends PartialType(CreatePaidOtherDto) {}
