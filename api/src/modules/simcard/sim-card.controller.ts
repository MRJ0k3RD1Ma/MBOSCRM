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
import { SimCardService } from './sim-card.service';
import { CreateSimCardDto } from './dto/create-sim-card.dto';
import { FindAllSimCardQueryDto } from './dto/findAll-sim-card.dto';
import { UpdateSimCardDto } from './dto/update-sim-card.dto';

@Controller('sim-card')
export class SimCardController {
  constructor(private readonly simCardService: SimCardService) {}

  @Post()
  @DecoratorWrapper('create SimCard', true, [Role.Admin])
  create(@Body() createSimCardDto: CreateSimCardDto) {
    return this.simCardService.create(createSimCardDto);
  }

  @Get()
  @DecoratorWrapper('Get All Sim Cards', true, [Role.Admin])
  findAll(@Query() query: FindAllSimCardQueryDto) {
    return this.simCardService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get SimCard by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.simCardService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update Sim Card', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSimCardDto: UpdateSimCardDto,
  ) {
    return this.simCardService.update(+id, updateSimCardDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Sim Card', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.simCardService.remove(+id);
  }
}
