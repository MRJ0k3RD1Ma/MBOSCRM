import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<{
        id: number;
        name: string;
        balance: number;
    }>;
    update(data: UpdateSettingsDto): Promise<{
        id: number;
        name: string;
        balance: number;
    }>;
}
