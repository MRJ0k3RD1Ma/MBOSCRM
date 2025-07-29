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
import { SupplierService } from './supplier.service';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Request } from 'express';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @DecoratorWrapper('create Supplier', true, [Role.Admin])
  create(@Body() createSupplierDto: CreateSupplierDto, @Req() req: Request) {
    const creatorId = req.user.id;
    return this.supplierService.create(createSupplierDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('Get All Suppliers', true, [Role.Admin])
  findAll(@Query() query: FindAllSupplierQueryDto) {
    return this.supplierService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get Supplier by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update Supplier', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
    @Req() req: Request,
  ) {
    const creatorId = req.user.id;
    return this.supplierService.update(+id, updateSupplierDto, creatorId);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Supplier', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.supplierService.remove(+id);
  }
}
