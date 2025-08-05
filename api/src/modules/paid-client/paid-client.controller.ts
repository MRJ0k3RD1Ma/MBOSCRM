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
import { PaidClientService } from './paid-client.service';
import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';

@Controller('paid-client')
export class PaidClientController {
  constructor(private readonly paidClientService: PaidClientService) {}

  @Post()
  create(@Body() createPaidClientDto: CreatePaidClientDto) {
    return this.paidClientService.create(createPaidClientDto);
  }

  @Get()
  findAll(@Query() dto: FindAllQueryPaidClientDto) {
    return this.paidClientService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paidClientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaidClientDto: UpdatePaidClientDto,
  ) {
    return this.paidClientService.update(+id, updatePaidClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paidClientService.remove(+id);
  }
}
