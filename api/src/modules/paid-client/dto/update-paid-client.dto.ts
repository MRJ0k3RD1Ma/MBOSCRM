import { PartialType } from '@nestjs/swagger';
import { CreatePaidClientDto } from './create-paid-client.dto';

export class UpdatePaidClientDto extends PartialType(CreatePaidClientDto) {}
