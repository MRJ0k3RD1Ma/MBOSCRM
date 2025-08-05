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
import { ProductUnitService } from './product-unit.service';
import { CreateProductUnitDto } from './dto/create-product-unit.dto';
import { UpdateProductUnitDto } from './dto/update-product-unit.dto';
import { FindAllProductUnitQueryDto } from './dto/findAll-product-unit-query.dto';
import { Role } from 'src/common/auth/roles/role.enum';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';

@Controller('product-unit')
export class ProductUnitController {
  constructor(private readonly productUnitService: ProductUnitService) {}

  @Post()
  @DecoratorWrapper('Create product unit', true, [Role.Admin])
  create(@Body() createProductUnitDto: CreateProductUnitDto) {
    return this.productUnitService.create(createProductUnitDto);
  }

  @Get()
  @DecoratorWrapper('Get all product units')
  findAll(@Query() dto: FindAllProductUnitQueryDto) {
    return this.productUnitService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('Get product unit by id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productUnitService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update product unit', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProductUnitDto: UpdateProductUnitDto,
  ) {
    return this.productUnitService.update(+id, updateProductUnitDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete product unit', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productUnitService.remove(+id);
  }
}
