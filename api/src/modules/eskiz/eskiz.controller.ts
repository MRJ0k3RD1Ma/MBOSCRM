import { Controller } from "@nestjs/common";
import { EskizService } from "./eskiz.service";
import { FeatureFlag } from "../feature-flag/feature-flag.decorator";

@Controller("eskiz")
@FeatureFlag("ESKIZ")
export class EskizController {
	constructor(private readonly eskizService: EskizService) {}
}
