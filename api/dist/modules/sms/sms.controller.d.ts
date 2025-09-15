import { SmsService } from "./sms.service";
import { SendMessageDto } from "./dtos/send-message.dto";
import { Request } from 'express';
export declare class SmsController {
    private readonly smsService;
    constructor(smsService: SmsService);
    sendMessage(body: SendMessageDto, req: Request): Promise<any>;
}
