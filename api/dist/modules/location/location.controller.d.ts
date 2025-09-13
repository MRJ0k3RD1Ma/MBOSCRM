import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getRegions(): Promise<{
        id: number;
        name: string | null;
    }[]>;
    getDistricts(regionId: number): Promise<{
        id: number;
        name: string | null;
        regionId: number | null;
    }[]>;
}
