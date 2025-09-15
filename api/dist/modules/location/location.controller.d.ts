import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getRegions(): Promise<{
        name: string | null;
        id: number;
    }[]>;
    getDistricts(regionId: number): Promise<{
        name: string | null;
        id: number;
        regionId: number | null;
    }[]>;
}
