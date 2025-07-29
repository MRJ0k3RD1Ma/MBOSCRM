import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FindAllPaymentQueryDto } from './dto/findAll-payment-query.dto';
import { Role } from 'src/common/auth/roles/role.enum';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @DecoratorWrapper('Create payment', true, [Role.Admin])
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @DecoratorWrapper('Get all payments')
  findAll(@Query() dto: FindAllPaymentQueryDto) {
    return this.paymentService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('Get payment by id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update payment', true, [Role.Admin])
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete payment', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
