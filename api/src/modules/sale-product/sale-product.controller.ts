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
  ParseIntPipe,
} from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { Request } from 'express';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { FindAllSaleProductQueryDto } from './dto/findAll-sale-product-query.dto';

@Controller('sale-product')
export class SaleProductController {
  constructor(private readonly saleProductService: SaleProductService) {}

  @Post()
  @DecoratorWrapper('create SaleProduct', true, [Role.Admin])
  create(
    @Body() createSaleProductDto: CreateSaleProductDto,
    @Req() req: Request,
  ) {
    const creatorId = req.user.id;
    return this.saleProductService.create(createSaleProductDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('findAll SaleProduct', true, [Role.Admin])
  findAll(@Query() dto: FindAllSaleProductQueryDto) {
    return this.saleProductService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOne SaleProduct', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.saleProductService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update SaleProduct', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSaleProductDto: UpdateSaleProductDto,
    @Req() req: Request,
  ) {
    const modifyId = req.user.id;
    return this.saleProductService.update(+id, updateSaleProductDto, modifyId);
  }

  @Delete(':id')
  @DecoratorWrapper('remove SaleProduct', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string, @Req() req: Request) {
    const modifyId = req.user.id;
    return this.saleProductService.remove(+id, modifyId);
  }
}
