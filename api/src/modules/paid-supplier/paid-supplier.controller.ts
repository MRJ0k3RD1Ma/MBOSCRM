import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { PaidSupplierService } from './paid-supplier.service';
import { FindAllPaidSupplierQueryDto } from './dto/findAll-paid-supplier.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreatePaidSupplierDto } from './dto/create-paid-supplier.dto';
import { UpdatePaidSupplierDto } from './dto/update-paid-supplier.dto';
import { Request } from 'express';

@Controller('paidsupplier')
export class PaidSupplierController {
  constructor(private readonly paidsupplierService: PaidSupplierService) {}

  @Post()
  @DecoratorWrapper('create PaidSupplier', true, [Role.Admin])
  create(
    @Body() createPaidSupplierDto: CreatePaidSupplierDto,
    @Req() req: Request,
  ) {
    const creatorId = req.user.id;
    return this.paidsupplierService.create(createPaidSupplierDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('Get All PaidSuppliers', true, [Role.Admin])
  findAll(@Query() query: FindAllPaidSupplierQueryDto) {
    return this.paidsupplierService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get PaidSupplier by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidsupplierService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update PaidSupplier', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidSupplierDto: UpdatePaidSupplierDto,
  ) {
    return this.paidsupplierService.update(+id, updatePaidSupplierDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete PaidSupplier', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string, @Req() req: Request) {
    const modifierId = req.user.id;
    return this.paidsupplierService.remove(+id, modifierId);
  }
}
