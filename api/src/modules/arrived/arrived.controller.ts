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
  ParseIntPipe,
} from '@nestjs/common';
import { ArrivedService } from './arrived.service';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { Request } from 'express';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';

@Controller('arrived')
export class ArrivedController {
  constructor(private readonly arrivedService: ArrivedService) {}

  @Post()
  @DecoratorWrapper('create Arrived', true, [Role.Admin])
  create(@Body() createArrivedDto: CreateArrivedDto, @Req() req: Request) {
    const creatorId = req.user.id;
    return this.arrivedService.create(createArrivedDto, creatorId);
  }

  @Get()
  @DecoratorWrapper('find Arrived', true, [Role.Admin])
  findAll(@Query() dto: FindAllArrivedQueryDto) {
    return this.arrivedService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find Arrived', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.arrivedService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update Arrived', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateArrivedDto: UpdateArrivedDto,
    @Req() req: Request
  ) {
    return this.arrivedService.update(+id, updateArrivedDto,req.user.id);
  }

  @Delete(':id')
  @DecoratorWrapper('delete Arrived', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.arrivedService.remove(+id);
  }
}
