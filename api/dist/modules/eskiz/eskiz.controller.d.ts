import { EskizService } from './eskiz.service';
import { EskizCallbackDto } from './dtos/eskiz-callback.dto';
export declare class EskizController {
    private readonly eskizService;
    constructor(eskizService: EskizService);
    getTemplates(): Promise<any>;
    callback(dto: EskizCallbackDto): Promise<boolean>;
}
