import { Module } from "@nestjs/common";
import { SimCardController } from "./sim-card.controller";
import { SimCardService } from "./sim-card.service";

@Module({
	controllers: [SimCardController],
	providers: [SimCardService],
	exports: [SimCardService],
})
export class SimCardModule {}
