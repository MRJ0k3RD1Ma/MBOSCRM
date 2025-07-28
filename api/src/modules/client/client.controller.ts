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
  Req,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request } from 'express';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @DecoratorWrapper('create Client', true, [Role.Admin])
  create(@Body() createClientDto: CreateClientDto,@Req() req: Request) {
    const creatorId = req.user.id;
    return this.clientService.create(createClientDto,creatorId);
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
    @Req() req: Request
  ) {
    const creatorId = req.user.id;
    return this.clientService.update(+id, updateClientDto,creatorId);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Client', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.clientService.remove(+id);
  }
}
