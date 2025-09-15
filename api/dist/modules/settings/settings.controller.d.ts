import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        creditReminderInterval: number;
        smsExpiredHour: number;
        smsPrice: number;
    }>;
    update(data: UpdateSettingsDto): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        creditReminderInterval: number;
        smsExpiredHour: number;
        smsPrice: number;
    }>;
}
