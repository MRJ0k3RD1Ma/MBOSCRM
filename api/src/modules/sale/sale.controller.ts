import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Request } from 'express';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { FindAllSaleQueryDto } from './dto/findAll-sale-query.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @DecoratorWrapper('create Sale', true, [Role.Admin])
  create(@Body() createSaleDto: CreateSaleDto, @Req() req: Request) {
    const creatorId = req.user.id;
    return this.saleService.create(createSaleDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('find Sale', true, [Role.Admin])
  findAll(@Query() dto: FindAllSaleQueryDto) {
    return this.saleService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find Sale', true, [Role.Admin])
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update Sale', true, [Role.Admin])
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete Sale', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
