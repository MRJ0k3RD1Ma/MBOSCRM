import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { ClientCrmService } from './client-crm.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';

@Controller('client-crm')
export class ClientCrmController {
  constructor(private readonly clientCrmService: ClientCrmService) {}

  @Post()
  @DecoratorWrapper('create Client Crm', true, [Role.Admin])
  create(@Body() createClientCrmDto: CreateClientCrmDto) {
    return this.clientCrmService.create(createClientCrmDto);
  }

  @Get()
  @DecoratorWrapper('Get All Client Crms', true, [Role.Admin])
  findAll(@Query() query: FindAllClientCrmQueryDto) {
    return this.clientCrmService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get Client Crm by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.clientCrmService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update Client Crm', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateClientCrmDto: UpdateClientCrmDto,
  ) {
    return this.clientCrmService.update(+id, updateClientCrmDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Client Crm', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.clientCrmService.remove(+id);
  }
}
