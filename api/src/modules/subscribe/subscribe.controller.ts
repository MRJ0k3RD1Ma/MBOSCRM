import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  @DecoratorWrapper('create Subscribe', true, [Role.Admin])
  create(@Body() createSubscribeDto: CreateSubscribeDto) {
    return this.subscribeService.create(createSubscribeDto);
  }

  @Get()
  @DecoratorWrapper('find Subscribe', true, [Role.Admin])
  findAll(@Query() dto: FindAllSubscribeQueryDto) {
    return this.subscribeService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('find Subscribe', true, [Role.Admin])
  findOne(@Param('id') id: string) {
    return this.subscribeService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('update Subscribe', true, [Role.Admin])
  update(
    @Param('id') id: string,
    @Body() updateSubscribeDto: UpdateSubscribeDto,
  ) {
    return this.subscribeService.update(+id, updateSubscribeDto);
  }

  @Delete(':id')
  @DecoratorWrapper('delete Subscribe', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.subscribeService.remove(+id);
  }
}
