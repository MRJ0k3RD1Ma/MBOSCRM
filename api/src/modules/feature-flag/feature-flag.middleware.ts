import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { FeatureFlagService } from "./feature-flag.service";
import { FEATURE_FLAG_KEY } from "./feature-flag.decorator";

export class FeatureFlagGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private featureFlagService: FeatureFlagService,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const featureFlag = this.reflector.get(
			FEATURE_FLAG_KEY,
			context.getHandler(),
		);
		return this.featureFlagService.isActive(featureFlag);
	}
}
