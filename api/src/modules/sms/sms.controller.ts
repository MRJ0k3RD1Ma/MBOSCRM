import { Controller } from "@nestjs/common";
import { FeatureFlag } from "../feature-flag/feature-flag.decorator";
import { SmsService } from "./sms.service";

@Controller("sms")
@FeatureFlag("sms")
export class SmsController {
	constructor(private readonly smsService: SmsService) {}
}
