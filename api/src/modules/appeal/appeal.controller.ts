import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, ParseIntPipe } from '@nestjs/common';
import { AppealService } from './appeal.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { FindAllAppealDto } from './dto/findAll-appeal.dto';
import { Request } from 'express';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';

@Controller('appeal')
export class AppealController {
  constructor(private readonly appealService: AppealService) { }

  @Post()
  @DecoratorWrapper('createAppeal')
  create(@Body() createAppealDto: CreateAppealDto) {
    return this.appealService.create(createAppealDto);
  }

  @Get()
  @DecoratorWrapper('findAllAppeal')
  findAll(@Query() dto: FindAllAppealDto) {
    return this.appealService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneAppeal')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.appealService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateAppeal', true, [Role.Admin])
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAppealDto: UpdateAppealDto, @Req() req: Request) {
    const modifyId = req.user.id
    return this.appealService.update(+id, updateAppealDto, modifyId);
  }

  @Delete(':id')
  @DecoratorWrapper('removeAppeal', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.appealService.remove(+id);
  }
}
