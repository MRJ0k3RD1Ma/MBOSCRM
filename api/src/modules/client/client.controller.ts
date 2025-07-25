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
import { ClientService } from './client.service';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @DecoratorWrapper('create Client', true, [Role.Admin])
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @DecoratorWrapper('Get All Clients', true, [Role.Admin])
  findAll(@Query() query: FindAllClientQueryDto) {
    return this.clientService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get Client by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update Client', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Client', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.clientService.remove(+id);
  }
}
