import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeatureFlag } from '../feature-flag/feature-flag.decorator';
import { SmsService } from './sms.service';
import { CrmAuthGuard } from 'src/common/auth/crm-auth.guard';
import { SendMessageDto } from './dtos/send-message.dto';
import { Request } from 'express';
import { env } from 'src/common/config';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { FindAllSmsQueryDto } from './dtos/findAll-sms-query.dto';

@Controller('sms')
@FeatureFlag('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @DecoratorWrapper('send Sms')
  @UseGuards(CrmAuthGuard)
  sendMessage(@Body() body: SendMessageDto, @Req() req: Request) {
    const key = req.crm?.key || env.MAIN_KEY;
    return this.smsService.sendMessage(body.mobile_phone, body.message, key);
  }

  @Get()
  @DecoratorWrapper('find Sms')
  @UseGuards(CrmAuthGuard)
  findAll(@Query() dto: FindAllSmsQueryDto, @Req() req: Request) {
    const key = req.crm?.key;

    return this.smsService.getMessages(dto,key);
  }
}
