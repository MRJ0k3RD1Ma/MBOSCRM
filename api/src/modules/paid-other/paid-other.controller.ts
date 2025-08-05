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
import { PaidOtherService } from './paid-other.service';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('paid-other')
export class PaidOtherController {
  constructor(private readonly paidOtherService: PaidOtherService) {}

  @Post()
  @DecoratorWrapper('create PaidOther', true, [Role.Admin])
  create(@Body() createPaidOtherDto: CreatePaidOtherDto) {
    return this.paidOtherService.create(createPaidOtherDto);
  }

  @Get()
  @DecoratorWrapper('find all PaidOthers', true, [Role.Admin])
  findAll(@Query() dto: FindAllQueryPaidOtherDto) {
    return this.paidOtherService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find PaidOther by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidOtherService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update PaidOther', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidOtherDto: UpdatePaidOtherDto,
  ) {
    return this.paidOtherService.update(+id, updatePaidOtherDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete PaidOther', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paidOtherService.remove(+id);
  }
}
