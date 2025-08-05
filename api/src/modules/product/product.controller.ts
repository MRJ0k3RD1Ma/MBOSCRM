import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindAllProductQueryDto } from './dto/findAll-product.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @DecoratorWrapper('Create product', true, [Role.Admin])
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    const creatorId = req.user.id;
    return this.productService.create(createProductDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('Get all products')
  findAll(@Query() dto: FindAllProductQueryDto) {
    return this.productService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('Get product by id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update product', true, [Role.Admin])
  update(@Param('id', ParseIntPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete product', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productService.remove(+id);
  }
}
