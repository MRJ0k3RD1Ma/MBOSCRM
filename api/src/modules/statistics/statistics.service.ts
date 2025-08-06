import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaidOtherType, Prisma, SubscribeState } from '@prisma/client';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatistics() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const [
      totalClients,
      totalSuppliers,
      totalProducts,
      totalSales,
      totalDebt,
      totalPaidToSupplier,
      totalPaidByClient,
      totalOtherIncome,
      totalOtherOutcome,
      totalClientBalance,
      totalSupplierBalance,
      salesThisMonth,
      arrivedThisMonth,
      paidToSuppliersThisMonth,
      paidByClientsThisMonth,
      monthlySales,
      topClients,
      topProducts,
      activeSubscriptions,
      totalSubscriptionRevenue,
    ] = await Promise.all([
      this.prisma.client.count({ where: { isDeleted: false } }),
      this.prisma.supplier.count({ where: { isDeleted: false } }),
      this.prisma.product.count({ where: { isDeleted: false } }),
      this.prisma.sale.aggregate({
        _sum: { price: true },
        where: { isDeleted: false },
      }),
      this.prisma.sale.aggregate({
        _sum: { dept: true },
        where: { isDeleted: false },
      }),
      this.prisma.paidSupplier.aggregate({
        _sum: { price: true },
        where: { isDeleted: false },
      }),
      this.prisma.paidClient.aggregate({
        _sum: { price: true },
        where: { isDeleted: false },
      }),
      this.prisma.paidOther.aggregate({
        _sum: { price: true },
        where: { type: PaidOtherType.INCOME, isDeleted: false },
      }),
      this.prisma.paidOther.aggregate({
        _sum: { price: true },
        where: { type: PaidOtherType.OUTCOME, isDeleted: false },
      }),
      this.prisma.client.aggregate({
        _sum: { balance: true },
        where: { isDeleted: false },
      }),
      this.prisma.supplier.aggregate({
        _sum: { balance: true },
        where: { isDeleted: false },
      }),
      this.prisma.sale.aggregate({
        _sum: { price: true },
        where: { isDeleted: false, date: { gte: startDate, lt: endDate } },
      }),
      this.prisma.arrived.aggregate({
        _sum: { price: true },
        where: { isDeleted: false, date: { gte: startDate, lt: endDate } },
      }),
      this.prisma.paidSupplier.aggregate({
        _sum: { price: true },
        where: {
          isDeleted: false,
          paidDate: { gte: startDate, lt: endDate },
        },
      }),
      this.prisma.paidClient.aggregate({
        _sum: { price: true },
        where: {
          isDeleted: false,
          paidDate: { gte: startDate, lt: endDate },
        },
      }),
      this.prisma.$queryRaw<
        { year: number; month: number; total_sales: number }[]
      >(
        Prisma.sql`
          SELECT
            EXTRACT(YEAR FROM "date")::int AS year,
            EXTRACT(MONTH FROM "date")::int AS month,
            SUM("price") AS total_sales
          FROM "Sale"
          WHERE "isDeleted" = false
          GROUP BY 1, 2
          ORDER BY 1, 2;
        `,
      ),
      this.prisma.sale.groupBy({
        by: ['clientId'],
        _sum: { price: true },
        where: { isDeleted: false },
        orderBy: { _sum: { price: 'desc' } },
        take: 10,
      }),
      this.prisma.saleProduct.groupBy({
        by: ['productId'],
        _sum: { count: true },
        where: { isDeleted: false },
        orderBy: { _sum: { count: 'desc' } },
        take: 10,
      }),
      this.prisma.subscribe.count({
        where: { isDeleted: false, state: SubscribeState.NOTPAYING },
      }),
      this.prisma.subscribe.aggregate({
        _sum: { paid: true },
        where: { isDeleted: false, state: SubscribeState.PAID },
      }),
    ]);

    const clientIds = topClients.map((c) => c.clientId);
    const productIds = topProducts.map((p) => p.productId);

    const [clientDetails, productDetails] = await Promise.all([
      this.prisma.client.findMany({
        where: { id: { in: clientIds } },
        select: { id: true, name: true },
      }),
      this.prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true },
      }),
    ]);

    const topClientsWithNames = topClients.map((client) => {
      const detail = clientDetails.find((d) => d.id === client.clientId);
      return {
        ...client,
        name: detail?.name || 'Unknown Client',
      };
    });

    const topProductsWithNames = topProducts.map((product) => {
      const detail = productDetails.find((d) => d.id === product.productId);
      return {
        ...product,
        name: detail?.name || 'Unknown Product',
      };
    });

    const settings = await this.prisma.setting.findUnique({ where: { id: 1 } });

    return {
      balance: settings.balance,
      totals: {
        clients: totalClients,
        suppliers: totalSuppliers,
        products: totalProducts,
      },
      financials: {
        totalSales: totalSales._sum.price || 0,
        totalDebt: totalDebt._sum.dept || 0,
        totalPaidToSupplier: totalPaidToSupplier._sum.price || 0,
        totalPaidByClient: totalPaidByClient._sum.price || 0,
        totalOtherIncome: totalOtherIncome._sum.price || 0,
        totalOtherOutcome: totalOtherOutcome._sum.price || 0,
        totalClientBalance: totalClientBalance._sum.balance || 0,
        totalSupplierBalance: totalSupplierBalance._sum.balance || 0,
      },
      thisMonth: {
        sales: salesThisMonth._sum.price || 0,
        arrived: arrivedThisMonth._sum.price || 0,
        paidToSuppliers: paidToSuppliersThisMonth._sum.price || 0,
        paidByClients: paidByClientsThisMonth._sum.price || 0,
      },
      subscriptions: {
        active: activeSubscriptions,
        totalRevenue: totalSubscriptionRevenue._sum.paid || 0,
      },
      charts: {
        monthlySales,
        topClients: topClientsWithNames,
        topProducts: topProductsWithNames,
      },
    };
  }
}
