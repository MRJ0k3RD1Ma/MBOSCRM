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
import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('paid-server')
export class PaidServerController {
  constructor(private readonly paidServerService: PaidServerService) {}

  @Post()
  @DecoratorWrapper('create PaidServer', true, [Role.Admin])
  create(@Body() createPaidServerDto: CreatePaidServerDto) {
    return this.paidServerService.create(createPaidServerDto);
  }

  @Get()
  @DecoratorWrapper('find all PaidServers', true, [Role.Admin])
  findAll(@Query() dto: FindAllQueryPaidServerDto) {
    return this.paidServerService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find PaidServer by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidServerService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update PaidServer', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidServerDto: UpdatePaidServerDto,
  ) {
    return this.paidServerService.update(+id, updatePaidServerDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete PaidServer', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paidServerService.remove(+id);
  }
}
