import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { ArrivedProductService } from './arrived-product.service';
import { CreateArrivedProductDto } from './dto/create-arrived-product.dto';
import { FindAllArrivedProdcutQueryDto } from './dto/findAll-arrived-product-query.dto';
import { UpdateArrivedProductDto } from './dto/update-arrived-product.dto';

@Controller('arrived-product')
export class ArrivedProductController {
  constructor(private readonly arrivedproductService: ArrivedProductService) {}

  @Post()
  @DecoratorWrapper('create ArrivedProduct', true, [Role.Admin])
  create(@Body() createArrivedProductDto: CreateArrivedProductDto) {
    return this.arrivedproductService.create(createArrivedProductDto);
  }

  @Get()
  @DecoratorWrapper('find ArrivedProduct', true, [Role.Admin])
  findAll(@Query() dto: FindAllArrivedProdcutQueryDto) {
    return this.arrivedproductService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find ArrivedProduct', true, [Role.Admin])
  findOne(@Param('id') id: string) {
    return this.arrivedproductService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update ArrivedProduct', true, [Role.Admin])
  update(
    @Param('id') id: string,
    @Body() updateArrivedProductDto: UpdateArrivedProductDto,
  ) {
    return this.arrivedproductService.update(+id, updateArrivedProductDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete ArrivedProduct', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.arrivedproductService.remove(+id);
  }
}
