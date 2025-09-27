import { Module } from "@nestjs/common";
import { SaleFeedbackService } from "./sale-feedback.service";
import { SaleFeedbackController } from "./sale-feedback.controller";
import { SmsModule } from "../sms/sms.module";

@Module({
	controllers: [SaleFeedbackController],
	providers: [SaleFeedbackService],
	exports: [SaleFeedbackService],
	imports: [SmsModule],
})
export class SaleFeedbackModule {}
