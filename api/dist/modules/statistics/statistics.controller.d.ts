import { StatisticsService } from './statistics.service';
import { GetOutcomeQueryDto } from './dto/get-outcome.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    findOne(year?: number): Promise<{
        balance: number;
        totals: {
            clients: number;
            contracts: number;
            income: any;
            expenses: any;
            debts: number;
            currentMonthIncome: any;
            currentMonthExpenses: any;
            yearlyIncome: any;
            lastYearIncome: any;
        };
        month: {
            name: string;
            income: any;
            outcome: any;
            credit: any;
        };
        charts: {
            monthlyStats: {
                expectedSubscription: number;
                month: number;
                tushum: any;
                chiqim: any;
                productsSold: any;
                servicesSold: any;
                subscriptionSold: any;
                credit: any;
            }[];
        };
    }>;
    outcome(query: GetOutcomeQueryDto): Promise<{
        paidOther: number;
        paidSupplier: number;
        paidServer: number;
    }>;
    exportExcel(year?: number, month?: number): Promise<import("@nestjs/common").StreamableFile>;
    exportJson(year?: number, month?: number): Promise<{
        rows: any[];
        totals: {
            priceOfTotalSold: number;
            priceOfTotalArrived: number;
            profit: number;
        };
    }>;
}
