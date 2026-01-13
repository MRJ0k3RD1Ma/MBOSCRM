import { StreamableFile } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetOutcomeQueryDto } from './dto/get-outcome.dto';
export declare class StatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    outcome(query: GetOutcomeQueryDto): Promise<{
        paidOther: number;
        paidSupplier: number;
        paidServer: number;
    }>;
    exportAsJson(year?: number, month?: number): Promise<{
        rows: any[];
        totals: {
            priceOfTotalSold: number;
            priceOfTotalArrived: number;
            profit: number;
        };
    }>;
    exportAsExcel(year?: number, month?: number): Promise<StreamableFile>;
    getStatistics(year?: number): Promise<{
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
                month: number;
                tushum: any;
                chiqim: any;
                expectedSubscription: number;
                productsSold: any;
                servicesSold: any;
                subscriptionSold: any;
                credit: any;
            }[];
            subscriptionForecast: number[];
        };
    }>;
}
