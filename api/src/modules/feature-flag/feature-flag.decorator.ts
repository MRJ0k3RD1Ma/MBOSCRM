import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { FeatureFlagGuard } from './feature-flag.middleware';

export const FEATURE_FLAG_KEY = 'FEATURE_FLAG';
export const FeatureFlagMetadata = (key: string) =>
  SetMetadata(FEATURE_FLAG_KEY, key);

export function FeatureFlag(key: string) {
  return applyDecorators(FeatureFlagMetadata(key), UseGuards(FeatureFlagGuard));
}
