import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        creditReminderInterval: number;
        smsExpiredHour: number;
        smsPrice: number;
    }>;
    update(data: UpdateSettingsDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        creditReminderInterval: number;
        smsExpiredHour: number;
        smsPrice: number;
    }>;
}
