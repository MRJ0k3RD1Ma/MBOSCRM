import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { AccessService } from './access.service';
import { FindAllAccessQueryDto } from './dto/findAll-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';

@Controller('access')
@ApiTags('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Get()
  @DecoratorWrapper('Get all access')
  findAll(@Query() dto: FindAllAccessQueryDto) {
    return this.accessService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('Get access by id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.accessService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update access', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateProductDto: UpdateAccessDto,
  ) {
    return this.accessService.update(+id, updateProductDto);
  }
}
