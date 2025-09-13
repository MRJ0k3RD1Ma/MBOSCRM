import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { FeatureFlag } from "../feature-flag/feature-flag.decorator";
import { SmsService } from "./sms.service";
import { CrmAuthGuard } from "src/common/auth/crm-auth.guard";
import { SendMessageDto } from "./dtos/send-message.dto";
import {Request} from 'express';
import { env } from "src/common/config";
import { DecoratorWrapper } from "src/common/auth/decorator.auth";

@Controller("sms")
@FeatureFlag("sms")
export class SmsController {
	constructor(private readonly smsService: SmsService) {}
  
  @Post("send")
  @UseGuards(CrmAuthGuard)
  sendMessage(@Body() body:SendMessageDto,@Req() req:Request) {
    const key=req.crm?.key||env.MAIN_KEY
    return this.smsService.sendMessage(body.mobile_phone, body.message,key);
  }

}
