import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { ClientTypeService } from './clientType.service';
import { CreateClientTypeDto } from './dto/create-client-type.dto';
import { FindAllClientTypeQueryDto } from './dto/findAll-client-type.dto';
import { UpdateClientTypeDto } from './dto/update-client-type.dto';

@Controller('client/type')
export class ClientTypeController {
  constructor(private readonly clientTypeService: ClientTypeService) {}

  @Post()
  @DecoratorWrapper('Create ClientType', true, [Role.Admin])
  create(@Body() createClientTypeDto: CreateClientTypeDto) {
    return this.clientTypeService.create(createClientTypeDto);
  }

  @Get()
  @DecoratorWrapper('Get All ClientTypes', true, [Role.Admin])
  findAll(@Query() query: FindAllClientTypeQueryDto) {
    return this.clientTypeService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get ClientType by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.clientTypeService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update ClientType', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateClientTypeDto: UpdateClientTypeDto,
  ) {
    return this.clientTypeService.update(+id, updateClientTypeDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete ClientType', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.clientTypeService.remove(+id);
  }
}
