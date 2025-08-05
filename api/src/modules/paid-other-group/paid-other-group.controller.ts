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
import { PaidOtherGroupService } from './paid-other-group.service';
import { CreatePaidOtherGroupDto } from './dto/create-paid-other-group.dto';
import { FindAllPaidOtherGroupQueryDto } from './dto/findAll-paid-other-group.dto';
import { UpdatePaidOtherGroupDto } from './dto/update-paid-other-group.dto';

@Controller('paid-other/group')
export class PaidOtherGroupController {
  constructor(private readonly paidOtherGroupService: PaidOtherGroupService) {}

  @Post()
  @DecoratorWrapper('Create PaidOtherGroup', true, [Role.Admin])
  create(@Body() createPaidOtherGroupDto: CreatePaidOtherGroupDto) {
    return this.paidOtherGroupService.create(createPaidOtherGroupDto);
  }

  @Get()
  @DecoratorWrapper('Get All PaidOtherGroups', true, [Role.Admin])
  findAll(@Query() query: FindAllPaidOtherGroupQueryDto) {
    return this.paidOtherGroupService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get PaidOtherGroup by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.paidOtherGroupService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update PaidOtherGroup', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePaidOtherGroupDto: UpdatePaidOtherGroupDto,
  ) {
    return this.paidOtherGroupService.update(+id, updatePaidOtherGroupDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete PaidOtherGroup', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.paidOtherGroupService.remove(+id);
  }
}
