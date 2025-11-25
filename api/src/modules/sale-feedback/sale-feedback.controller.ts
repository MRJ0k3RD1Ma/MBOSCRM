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
  ParseUUIDPipe,
} from '@nestjs/common';
import { SaleFeedbackService } from './sale-feedback.service';
import { CreateSaleFeedbackDto } from './dto/create-sale-feedback.dto';
import {
  AliasParamDto,
  UpdateSaleFeedbackDto,
  UpdateStateDto,
} from './dto/update-sale-feedback.dto';
import { FindAllSaleFeedbackDto } from './dto/findAll-sale-feedback.dto';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';

@Controller('sale-feedback')
export class SaleFeedbackController {
  constructor(private readonly saleFeedbackService: SaleFeedbackService) { }

  @Post()
  @DecoratorWrapper('saleFeedbackCreate', true, [Role.Admin])
  create(@Body() createSaleFeedbackDto: CreateSaleFeedbackDto) {
    return this.saleFeedbackService.create(createSaleFeedbackDto);
  }

  @Get()
  @DecoratorWrapper('saleFeedbackGetAll')
  findAll(@Query() dto: FindAllSaleFeedbackDto) {
    return this.saleFeedbackService.findAll(dto);
  }

  @Get('id/:id')
  @DecoratorWrapper('saleFeedbackGetOne')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleFeedbackService.findOne(id);
  }

  @Get('alias/:alias')
  @DecoratorWrapper('saleFeedbackGetOneWIthAlias')
  findOneSaleFeedback(@Param('alias' ) alias: string) {
    return this.saleFeedbackService.findOneByAlias(alias);
  }

  @Patch(':alias')
  @DecoratorWrapper('saleFeedbackUpdate')
  update(
    @Param('alias') alias: string,
    @Body() updateSaleFeedbackDto: UpdateSaleFeedbackDto,
  ) {
    return this.saleFeedbackService.update(alias, updateSaleFeedbackDto);
  }

  @Patch(':alias/state')
  @DecoratorWrapper('saleFeedbackUpdateState')
  updateState(
    @Body() dto: UpdateStateDto,
    @Param('alias') alias: string,
  ) {
    return this.saleFeedbackService.updateState(dto, alias);
  }

  @Delete(':id')
  @DecoratorWrapper('saleFeedbackDelete', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.saleFeedbackService.remove(+id);
  }
}
