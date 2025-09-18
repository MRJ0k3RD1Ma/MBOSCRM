import { Controller } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';

@Controller('feature-flag')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}
}
