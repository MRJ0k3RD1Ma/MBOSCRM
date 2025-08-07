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
  Req,
} from '@nestjs/common';
import { PaidClientService } from './paid-client.service';
import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { Request } from 'express';

@Controller('paid-client')
export class PaidClientController {
  constructor(private readonly paidClientService: PaidClientService) {}

  @Post()
  @DecoratorWrapper('create PaidClient', true, [Role.Admin])
  create(
    @Body() createPaidClientDto: CreatePaidClientDto,
    @Req() req: Request,
  ) {
    return this.paidClientService.create(createPaidClientDto, req.user.id);
  }

  @Get()
  @DecoratorWrapper('find all PaidClients', true, [Role.Admin])
  findAll(@Query() dto: FindAllQueryPaidClientDto) {
    return this.paidClientService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find PaidClient by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidClientService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update PaidClient', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidClientDto: UpdatePaidClientDto,
  ) {
    return this.paidClientService.update(+id, updatePaidClientDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete PaidClient', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paidClientService.remove(+id);
  }
}
