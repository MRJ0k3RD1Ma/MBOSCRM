import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PaidCrmService } from './paid-crm.service';
import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('paid-crm')
export class PaidCrmController {
  constructor(private readonly paidCrmService: PaidCrmService) {}

  @Post()
  @DecoratorWrapper('create PaidCrm', true, [Role.Admin])
  create(@Body() createPaidCrmDto: CreatePaidCrmDto) {
    return this.paidCrmService.create(createPaidCrmDto);
  }

  @Get()
  @DecoratorWrapper('find all PaidCrms', true, [Role.Admin])
  findAll(@Query() dto: FindAllQueryPaidCrmDto) {
    return this.paidCrmService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find PaidCrm by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidCrmService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update PaidCrm', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidCrmDto: UpdatePaidCrmDto,
  ) {
    return this.paidCrmService.update(+id, updatePaidCrmDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete PaidCrm', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paidCrmService.remove(+id);
  }
}
