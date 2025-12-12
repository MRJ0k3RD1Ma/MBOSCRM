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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dayjs_1 = __importDefault(require("dayjs"));
const exceljs_1 = require("exceljs");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportAsJson(year = new Date().getFullYear(), month) {
        const rows = [];
        let priceOfTotalSold = 0;
        let priceOfTotalArrived = 0;
        const devices = await this.prisma.product.findMany({
            where: { isDeleted: false, type: "DEVICE" },
            orderBy: { name: "asc" },
        });
        for (let device of devices) {
            let remiderInStartOfMonth = device.countReminder;
            const saleProducts = await this.prisma.saleProduct.aggregate({
                _sum: { count: true, priceCount: true },
                where: {
                    isDeleted: false,
                    sale: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                        },
                    },
                    product: { id: device.id },
                },
            });
            const arrivedProducts = await this.prisma.arrivedProduct.aggregate({
                _sum: { count: true, priceCount: true },
                where: {
                    isDeleted: false,
                    Arrived: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                        },
                    },
                    Product: { id: device.id },
                },
            });
            const saleProductsMonth = await this.prisma.saleProduct.aggregate({
                _sum: { count: true, priceCount: true },
                where: {
                    isDeleted: false,
                    sale: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                            lte: new Date(year, month, 0),
                        },
                    },
                    product: { id: device.id },
                },
            });
            const arrivedProductsMonth = await this.prisma.arrivedProduct.aggregate({
                _sum: { count: true, priceCount: true },
                where: {
                    isDeleted: false,
                    Arrived: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                            lte: new Date(year, month, 0),
                        },
                    },
                    Product: { id: device.id },
                },
            });
            remiderInStartOfMonth += saleProducts._sum.count || 0;
            remiderInStartOfMonth -= arrivedProducts._sum.count || 0;
            const numberOfDevicesSold = saleProductsMonth._sum.count || 0;
            const priceOfDevicesSold = saleProductsMonth._sum.priceCount || 0;
            const numberOfDevicesArrived = arrivedProductsMonth._sum.count || 0;
            const priceOfDevicesArrived = arrivedProductsMonth._sum.priceCount || 0;
            let remiderInEndOfMonth = remiderInStartOfMonth + numberOfDevicesArrived - numberOfDevicesSold;
            priceOfTotalSold += priceOfDevicesSold;
            priceOfTotalArrived += priceOfDevicesArrived;
            rows.push({
                name: device.name,
                type: device.type,
                remiderInStartOfMonth,
                numberOfSold: numberOfDevicesSold,
                priceOfSold: priceOfDevicesSold,
                numberOfArrived: numberOfDevicesArrived,
                priceOfArrived: priceOfDevicesArrived,
                profit: 0,
                remiderInEndOfMonth,
            });
        }
        const subscriptionProducts = await this.prisma.product.findMany({
            where: { isDeleted: false, type: "SUBSCRIPTION" },
            orderBy: { name: "asc" },
        });
        for (let subscriptionProduct of subscriptionProducts) {
            const subsciptions = await this.prisma.subscribe.aggregate({
                where: {
                    isDeleted: false,
                    sale: {
                        SaleProduct: { some: { product: { id: subscriptionProduct.id } } },
                    },
                    paying_date: {
                        gte: new Date(year, month - 1, 1),
                        lte: new Date(year, month, 0),
                    },
                },
                _sum: { price: true, paid: true },
                _count: { id: true },
            });
            const numberOfSubscriptionsSold = subsciptions._count.id || 0;
            const priceOfSubscriptionsSold = subsciptions._sum.price || 0;
            priceOfTotalSold += priceOfSubscriptionsSold;
            rows.push({
                name: subscriptionProduct.name,
                type: subscriptionProduct.type,
                remiderInStartOfMonth: 0,
                numberOfSold: numberOfSubscriptionsSold,
                priceOfSold: priceOfSubscriptionsSold,
                numberOfArrived: 0,
                priceOfArrived: 0,
                profit: priceOfSubscriptionsSold,
                remiderInEndOfMonth: 0,
            });
        }
        const services = await this.prisma.product.findMany({
            where: { isDeleted: false, type: "SERVICE" },
            orderBy: { name: "asc" },
        });
        for (let service of services) {
            const serviceSales = await this.prisma.saleProduct.aggregate({
                where: {
                    isDeleted: false,
                    product: { id: service.id },
                    sale: {
                        date: {
                            gte: new Date(year, month - 1, 1),
                            lte: new Date(year, month, 0),
                        },
                    },
                },
                _sum: { priceCount: true, count: true },
            });
            const numberOfServicesSold = serviceSales._sum.count || 0;
            const priceOfServicesSold = serviceSales._sum.priceCount || 0;
            priceOfTotalSold += priceOfServicesSold;
            rows.push({
                name: service.name,
                type: service.type,
                remiderInStartOfMonth: 0,
                numberOfSold: numberOfServicesSold,
                priceOfSold: priceOfServicesSold,
                numberOfArrived: 0,
                priceOfArrived: 0,
                profit: priceOfServicesSold,
                remiderInEndOfMonth: 0,
            });
        }
        return {
            rows,
            totals: {
                priceOfTotalSold,
                priceOfTotalArrived,
                profit: 0,
            },
        };
    }
    async exportAsExcel(year = new Date().getFullYear(), month) {
        const data = await this.exportAsJson(year, month);
        const excel = new exceljs_1.Workbook();
        const sheet = excel.addWorksheet("Hisobot");
        sheet.columns = [
            {
                header: "#",
                width: 5,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Mahsulot Nomi",
                width: 20,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Mahsulot Turi",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Oy Boshlanishiga qoldiq",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Sotilgan",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Ummumiy Summasi",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Kelgan",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Ummumiy Summasi",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Foyda",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
            {
                header: "Oy Oxiridagi Qoldiq",
                width: 10,
                alignment: { horizontal: "center", vertical: "middle" },
            },
        ];
        let sheetIndex = 1;
        for (let row of data.rows) {
            sheet.addRow([
                sheetIndex,
                row.name,
                row.type,
                row.remiderInStartOfMonth,
                row.numberOfSold,
                row.priceOfSold,
                row.numberOfArrived,
                row.priceOfArrived,
                row.profit,
                row.remiderInEndOfMonth,
            ]);
            sheetIndex++;
        }
        sheet.addRow([
            null,
            null,
            null,
            null,
            "Jami:",
            data.totals.priceOfTotalSold,
            null,
            data.totals.priceOfTotalArrived,
            data.totals.profit,
            null,
        ]);
        const buffer = await excel.xlsx.writeBuffer();
        const rawData = new Uint8Array(buffer);
        return new common_1.StreamableFile(rawData, {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
    }
    async getStatistics(year = new Date().getFullYear()) {
        if (year == 0)
            year = new Date().getFullYear();
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
        const [paidClientYearAgg, paidOtherIncomeYearAgg, paidSupplierYearAgg, arrivedYearAgg, paidServerYearAgg, paidOtherOutcomeYearAgg, saleDebtAgg, subscribeDeptAgg, paidClientCurrentMonthAgg, paidOtherIncomeCurrentMonthAgg, paidSupplierCurrentMonthAgg, arrivedCurrentMonthAgg, paidServerCurrentMonthAgg, paidOtherOutcomeCurrentMonthAgg, lastYearPaidClientAgg, lastYearPaidOtherIncomeAgg,] = await Promise.all([
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
                    type: "INCOME",
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
                    type: "OUTCOME",
                    isDeleted: false,
                },
            }),
            this.prisma.sale.aggregate({
                _sum: { credit: true },
                where: { isDeleted: false, client: { isDeleted: false } },
            }),
            this.prisma.subscribe.aggregate({
                _sum: { price: true, paid: true },
                where: {
                    isDeleted: false,
                    client: { isDeleted: false },
                    sale: { isDeleted: false },
                },
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
                    type: "INCOME",
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
                    type: "OUTCOME",
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
                    type: "INCOME",
                    isDeleted: false,
                },
            }),
        ]);
        const yearlyIncome = sumOrZero(paidClientYearAgg, "price") +
            sumOrZero(paidOtherIncomeYearAgg, "price");
        const yearlyExpenses = sumOrZero(paidSupplierYearAgg, "price") +
            sumOrZero(arrivedYearAgg, "price") +
            sumOrZero(paidServerYearAgg, "price") +
            sumOrZero(paidOtherOutcomeYearAgg, "price");
        const currentMonthIncome = sumOrZero(paidClientCurrentMonthAgg, "price") +
            sumOrZero(paidOtherIncomeCurrentMonthAgg, "price");
        const currentMonthExpenses = sumOrZero(paidSupplierCurrentMonthAgg, "price") +
            sumOrZero(arrivedCurrentMonthAgg, "price") +
            sumOrZero(paidServerCurrentMonthAgg, "price") +
            sumOrZero(paidOtherOutcomeCurrentMonthAgg, "price");
        const lastYearIncome = sumOrZero(lastYearPaidClientAgg, "price") +
            sumOrZero(lastYearPaidOtherIncomeAgg, "price");
        const clientDepts = await this.prisma.client.aggregate({
            _sum: { balance: true },
            where: {
                balance: { lt: 0 },
                isDeleted: false,
            },
        });
        const totalDebts = clientDepts._sum.balance;
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
                        type: "INCOME",
                        isDeleted: false,
                    },
                }),
                this.prisma.paidSupplier.aggregate({
                    _sum: { price: true },
                    where: { paidDate: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.paidServer.aggregate({
                    _sum: { price: true },
                    where: { createdAt: { gte: mStart, lte: mEnd }, isDeleted: false },
                }),
                this.prisma.paidOther.aggregate({
                    _sum: { price: true },
                    where: {
                        paidDate: { gte: mStart, lte: mEnd },
                        type: "OUTCOME",
                        isDeleted: false,
                    },
                }),
                this.prisma.sale.aggregate({
                    _sum: { credit: true },
                    where: {
                        createdAt: { gte: mStart, lte: mEnd },
                        isDeleted: false,
                        client: { isDeleted: false },
                    },
                }),
                this.prisma.subscribe.aggregate({
                    _sum: { price: true, paid: true },
                    where: {
                        paying_date: { gte: mStart, lte: mEnd },
                        isDeleted: false,
                        client: { isDeleted: false },
                    },
                }),
                this.prisma.saleProduct.aggregate({
                    _sum: { count: true, priceCount: true },
                    where: {
                        sale: {
                            date: { gte: mStart, lte: mEnd },
                            isDeleted: false,
                        },
                        product: {
                            type: { in: ["DEVICE"] },
                            isDeleted: false,
                        },
                        isDeleted: false,
                    },
                }),
                this.prisma.saleProduct.aggregate({
                    _sum: { count: true, priceCount: true },
                    where: {
                        sale: {
                            date: { gte: mStart, lte: mEnd },
                            isDeleted: false,
                        },
                        product: {
                            type: "SERVICE",
                            isDeleted: false,
                        },
                        isDeleted: false,
                    },
                }),
            ]).then(([pc, poInc, psup, pserv, poOut, saleDebtMonth, subAgg, productsSold, servicesSold,]) => {
                const incomeMonth = sumOrZero(pc, "price") + sumOrZero(poInc, "price");
                const expenseMonth = sumOrZero(psup, "price") +
                    sumOrZero(pserv, "price") +
                    sumOrZero(poOut, "price");
                const subPrice = sumOrZero(subAgg, "price");
                const subPaid = sumOrZero(subAgg, "paid");
                const expectedSubscription = Math.max(0, subPrice - subPaid);
                const saleCredit = sumOrZero(saleDebtMonth, "credit");
                const monthCredit = saleCredit + expectedSubscription;
                return {
                    month: i + 1,
                    tushum: incomeMonth,
                    chiqim: expenseMonth,
                    expectedSubscription,
                    productsSold: sumOrZero(productsSold, "priceCount"),
                    servicesSold: sumOrZero(servicesSold, "priceCount"),
                    subscriptionSold: subPrice,
                    credit: monthCredit,
                };
            });
        }));
        const subscriptionForecast = monthlyStats.map((m) => m.expectedSubscription);
        const currentMonth = monthlyStats[(0, dayjs_1.default)().month()];
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
            month: {
                name: (0, dayjs_1.default)().format("MMMM"),
                income: currentMonth.tushum,
                outcome: currentMonth.chiqim,
                credit: currentMonth.credit,
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