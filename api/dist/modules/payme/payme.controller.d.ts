import { PaymeService } from './payme.service';
export declare class PaymeController {
    private readonly paymeService;
    constructor(paymeService: PaymeService);
    payme(body: any): Promise<{
        result: {
            allow: boolean;
        };
    }>;
}
