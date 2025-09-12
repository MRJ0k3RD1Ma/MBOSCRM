import { Module } from '@nestjs/common';
import { SaleFeedbackService } from './sale-feedback.service';
import { SaleFeedbackController } from './sale-feedback.controller';

@Module({
  controllers: [SaleFeedbackController],
  providers: [SaleFeedbackService],
})
export class SaleFeedbackModule {}
