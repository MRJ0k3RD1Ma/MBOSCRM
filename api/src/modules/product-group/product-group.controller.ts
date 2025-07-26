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
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('product-group')
@ApiTags('Product Group')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Post()
  @DecoratorWrapper('Create product group', true, [Role.Admin])
  create(
    @Body() createProductGroupDto: CreateProductGroupDto,
    @Req() req: Request,
  ) {
    const creatorId = req.user.id;
    const modifyId = req.user.id;
    return this.productGroupService.create(
      createProductGroupDto,
      creatorId,
      modifyId,
    );
  }

  @Get()
  @DecoratorWrapper('Get all product groups')
  findAll(@Query() dto: FindAllProductGroupQueryDto) {
    return this.productGroupService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('Get product group by id')
  findOne(@Param('id') id: string) {
    return this.productGroupService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update product group', true, [Role.Admin])
  update(
    @Param('id') id: string,
    @Body() updateProductGroupDto: UpdateProductGroupDto,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.productGroupService.update(+id, updateProductGroupDto, userId);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete product group', true, [Role.Admin])
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.id;
    return this.productGroupService.remove(+id, userId);
  }
}
