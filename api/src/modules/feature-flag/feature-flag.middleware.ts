import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { FeatureFlagService } from "./feature-flag.service";
import { FEATURE_FLAG_KEY } from "./feature-flag.decorator";

export class FeatureFlagGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(FeatureFlagService) private featureFlagService: FeatureFlagService,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
let featureFlag = this.reflector.get<string>(
  FEATURE_FLAG_KEY,
  context.getHandler(),
) || this.reflector.get<string>(
  FEATURE_FLAG_KEY,
  context.getClass(),
);

    if(this.featureFlagService === undefined) return true

		return this.featureFlagService.isActive(featureFlag);
	}
}
