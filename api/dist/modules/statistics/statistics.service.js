"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStatistics(year = new Date().getFullYear()) {
        const today = new Date();
        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
        const startOfLastYear = new Date(year - 1, 0, 1);
        const endOfLastYear = new Date(year - 1, 11, 31, 23, 59, 59, 999);
        const sumOrZero = (agg, field) => (agg && agg._sum && (agg._sum[field] ?? 0)) || 0;
        const [settings, totalClients, totalSales] = await Promise.all([
            this.prisma.setting.findUnique({ where: { id: 1 } }),
            this.prisma.client.count({ where: { isDeleted: false } }),
            this.prisma.sale.count({ where: { isDeleted: false } }),
        ]);
        const [paidClientYearAgg, paidOtherIncomeYearAgg, paidSupplierYearAgg, arrivedYearAgg, paidServerYearAgg, paidOtherOutcomeYearAgg, saleDebtAgg, paidClientCurrentMonthAgg, paidOtherIncomeCurrentMonthAgg, paidSupplierCurrentMonthAgg, arrivedCurrentMonthAgg, paidServerCurrentMonthAgg, paidOtherOutcomeCurrentMonthAgg, lastYearPaidClientAgg, lastYearPaidOtherIncomeAgg,] = await Promise.all([
            this.prisma.paidClient.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfYear, lte: endOfYear },
                    isDeleted: false,
                },
            }),
            this.prisma.paidOther.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfYear, lte: endOfYear },
                    type: 'INCOME',
                    isDeleted: false,
                },
            }),
            this.prisma.paidSupplier.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfYear, lte: endOfYear },
                    isDeleted: false,
                },
            }),
            this.prisma.arrived.aggregate({
                _sum: { price: true },
                where: {
                    created: { gte: startOfYear, lte: endOfYear },
                    isDeleted: false,
                },
            }),
            this.prisma.paidServer.aggregate({
                _sum: { price: true },
                where: {
                    createdAt: { gte: startOfYear, lte: endOfYear },
                    isDeleted: false,
                },
            }),
            this.prisma.paidOther.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfYear, lte: endOfYear },
                    type: 'OUTCOME',
                    isDeleted: false,
                },
            }),
            this.prisma.sale.aggregate({
                _sum: { credit: true },
                where: { isDeleted: false },
            }),
            this.prisma.paidClient.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: currentMonthStart, lte: currentMonthEnd },
                    isDeleted: false,
                },
            }),
            this.prisma.paidOther.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: currentMonthStart, lte: currentMonthEnd },
                    type: 'INCOME',
                    isDeleted: false,
                },
            }),
            this.prisma.paidSupplier.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: currentMonthStart, lte: currentMonthEnd },
                    isDeleted: false,
                },
            }),
            this.prisma.arrived.aggregate({
                _sum: { price: true },
                where: {
                    created: { gte: currentMonthStart, lte: currentMonthEnd },
                    isDeleted: false,
                },
            }),
            this.prisma.paidServer.aggregate({
                _sum: { price: true },
                where: {
                    createdAt: { gte: currentMonthStart, lte: currentMonthEnd },
                    isDeleted: false,
                },
            }),
            this.prisma.paidOther.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: currentMonthStart, lte: currentMonthEnd },
                    type: 'OUTCOME',
                    isDeleted: false,
                },
            }),
            this.prisma.paidClient.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfLastYear, lte: endOfLastYear },
                    isDeleted: false,
                },
            }),
            this.prisma.paidOther.aggregate({
                _sum: { price: true },
                where: {
                    paidDate: { gte: startOfLastYear, lte: endOfLastYear },
                    type: 'INCOME',
                    isDeleted: false,
                },
            }),
        ]);
        const yearlyIncome = sumOrZero(paidClientYearAgg, 'price') +
            sumOrZero(paidOtherIncomeYearAgg, 'price');
        const yearlyExpenses = sumOrZero(paidSupplierYearAgg, 'price') +
            sumOrZero(arrivedYearAgg, 'price') +
            sumOrZero(paidServerYearAgg, 'price') +
            sumOrZero(paidOtherOutcomeYearAgg, 'price');
        const currentMonthIncome = sumOrZero(paidClientCurrentMonthAgg, 'price') +
            sumOrZero(paidOtherIncomeCurrentMonthAgg, 'price');
        const currentMonthExpenses = sumOrZero(paidSupplierCurrentMonthAgg, 'price') +
            sumOrZero(arrivedCurrentMonthAgg, 'price') +
            sumOrZero(paidServerCurrentMonthAgg, 'price') +
            sumOrZero(paidOtherOutcomeCurrentMonthAgg, 'price');
        const lastYearIncome = sumOrZero(lastYearPaidClientAgg, 'price') +
            sumOrZero(lastYearPaidOtherIncomeAgg, 'price');
        const totalDebts = sumOrZero(saleDebtAgg, 'credit');
        const monthlyStats = await Promise.all(Array.from({ length: 12 }, (_, i) => {
            const mStart = new Date(year, i, 1);
            const mEnd = new Date(year, i + 1, 0, 23, 59, 59, 999);
            return Promise.all([
                this.prisma.paidClient.aggregate({
                    _sum: { price: true },
                    where: { paidDate: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.paidOther.aggregate({
                    _sum: { price: true },
                    where: {
                        paidDate: { gte: mStart, lte: mEnd },
                        type: 'INCOME',
                        isDeleted: false,
                    },
                }),
                this.prisma.paidSupplier.aggregate({
                    _sum: { price: true },
                    where: { paidDate: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.arrived.aggregate({
                    _sum: { price: true },
                    where: { created: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.paidServer.aggregate({
                    _sum: { price: true },
                    where: { createdAt: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.paidOther.aggregate({
                    _sum: { price: true },
                    where: {
                        paidDate: { gte: mStart, lte: mEnd },
                        type: 'OUTCOME',
                        isDeleted: false,
                    },
                }),
                this.prisma.sale.aggregate({
                    _sum: { dept: true },
                    where: { createdAt: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.subscribe.aggregate({
                    _sum: { price: true, paid: true },
                    where: {
                        paying_date: { gte: mStart, lte: mEnd },
                        isDeleted: false,
                    },
                }),
            ]).then(([pc, poInc, psup, arr, pserv, poOut, saleDebtMonth, subAgg]) => {
                const incomeMonth = sumOrZero(pc, 'price') + sumOrZero(poInc, 'price');
                const expenseMonth = sumOrZero(psup, 'price') +
                    sumOrZero(arr, 'price') +
                    sumOrZero(pserv, 'price') +
                    sumOrZero(poOut, 'price');
                const debtMonth = sumOrZero(saleDebtMonth, 'dept');
                const subPrice = sumOrZero(subAgg, 'price');
                const subPaid = sumOrZero(subAgg, 'paid');
                const expectedSubscription = Math.max(0, subPrice - subPaid);
                return {
                    month: i + 1,
                    tushum: incomeMonth,
                    chiqim: expenseMonth,
                    qarzdorlik: debtMonth,
                    expectedSubscription,
                };
            });
        }));
        const subscriptionForecast = monthlyStats.map((m) => m.expectedSubscription);
        return {
            balance: settings?.balance ?? 0,
            totals: {
                clients: totalClients,
                contracts: totalSales,
                income: yearlyIncome,
                expenses: yearlyExpenses,
                debts: totalDebts,
                currentMonthIncome,
                currentMonthExpenses,
                yearlyIncome,
                lastYearIncome,
            },
            charts: {
                monthlyStats,
                subscriptionForecast,
            },
        };
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map