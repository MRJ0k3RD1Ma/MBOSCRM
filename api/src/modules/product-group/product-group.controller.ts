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
} from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { FindAllProductGroupQueryDto } from './dto/findAll-product-group.dto,';
import { Request } from 'express';

@Controller('product-group')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Post()
  create(@Body() createProductGroupDto: CreateProductGroupDto) {
    return this.productGroupService.create(createProductGroupDto);
  }

  @Get()
  findAll(@Query() dto: FindAllProductGroupQueryDto) {
    return this.productGroupService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productGroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductGroupDto: UpdateProductGroupDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.productGroupService.update(+id, updateProductGroupDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id;
    return this.productGroupService.remove(+id, userId);
  }
}
