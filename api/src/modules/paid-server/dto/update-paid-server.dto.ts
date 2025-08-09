import { PartialType } from '@nestjs/swagger';
import { CreatePaidServerDto } from './create-paid-server.dto';

export class UpdatePaidServerDto extends PartialType(CreatePaidServerDto) {}
