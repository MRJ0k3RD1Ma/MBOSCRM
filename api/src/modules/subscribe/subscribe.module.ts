import { Module } from "@nestjs/common";
import { SubscribeService } from "./subscribe.service";
import { SubscribeController } from "./subscribe.controller";
import { SmsModule } from "../sms/sms.module";

@Module({
	controllers: [SubscribeController],
	providers: [SubscribeService],
	exports: [SubscribeService],
	imports: [SmsModule],
})
export class SubscribeModule {}
