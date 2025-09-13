export declare const FEATURE_FLAG_KEY = "FEATURE_FLAG";
export declare const FeatureFlagMetadata: (key: string) => import("@nestjs/common").CustomDecorator<string>;
export declare function FeatureFlag(key: string): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
