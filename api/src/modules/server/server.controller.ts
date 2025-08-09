import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Request } from 'express';
import { FindAllQueryServer } from './dto/findAll-query-server.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  @DecoratorWrapper('createServer', true, [Role.Admin])
  create(@Body() createServerDto: CreateServerDto, @Req() req: Request) {
    const modifyId = req.user.id;
    return this.serverService.create(createServerDto, modifyId);
  }

  @Get()
  @DecoratorWrapper('findAllServer', true, [Role.Admin])
  findAll(@Query() dto: FindAllQueryServer) {
    return this.serverService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneServer', true, [Role.Admin])
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateServer', true, [Role.Admin])
  update(
    @Param('id') id: string,
    @Body() updateServerDto: UpdateServerDto,
    @Req() req: Request,
  ) {
    const modifyId = req.user.id;
    return this.serverService.update(+id, updateServerDto, modifyId);
  }

  @Delete(':id')
  @DecoratorWrapper('removeServer', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.serverService.remove(+id);
  }
}
