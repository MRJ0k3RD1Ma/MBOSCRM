import { Injectable, StreamableFile } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import dayjs from 'dayjs'
import { Workbook } from 'exceljs'
import { GetOutcomeQueryDto } from './dto/get-outcome.dto'

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async outcome(query: GetOutcomeQueryDto) {
    const { fromDate, toDate } = query
    const paidOther = await this.prisma.paidOther.aggregate({
      where: { paidDate: { lte: toDate, gte: fromDate }, isDeleted: false },
      _sum: { price: true },
    })

    const paidSupplier = await this.prisma.paidSupplier.aggregate({
      where: { paidDate: { lte: toDate, gte: fromDate }, isDeleted: false },
      _sum: { price: true },
    })

    const paidServer = await this.prisma.paidServer.aggregate({
      where: { createdAt: { lte: toDate, gte: fromDate }, isDeleted: false },
      _sum: { price: true },
    })

    return {
      paidOther: paidOther._sum.price || 0,
      paidSupplier: paidSupplier._sum.price || 0,
      paidServer: paidServer._sum.price || 0,
    }
  }

  async exportAsJson(year: number = dayjs().year(), month?: number) {
    const rows = []
    let priceOfTotalSold = 0
    let priceOfTotalArrived = 0

    const devices = await this.prisma.product.findMany({
      where: { isDeleted: false, type: 'DEVICE' },
      orderBy: { name: 'asc' },
    })

    for (let device of devices) {
      let remiderInStartOfMonth = device.countReminder

      const saleProducts = await this.prisma.saleProduct.aggregate({
        _sum: { count: true, priceCount: true },
        where: {
          isDeleted: false,
          sale: {
            date: {
              gte: dayjs()
                .year(year)
                .month(month - 1)
                .startOf('month')
                .toDate(),
            },
          },
          product: { id: device.id },
        },
      })

      const arrivedProducts = await this.prisma.arrivedProduct.aggregate({
        _sum: { count: true, priceCount: true },
        where: {
          isDeleted: false,
          Arrived: {
            date: {
              gte: dayjs()
                .year(year)
                .month(month - 1)
                .startOf('month')
                .toDate(),
            },
          },
          Product: { id: device.id },
        },
      })

      const saleProductsMonth = await this.prisma.saleProduct.aggregate({
        _sum: { count: true, priceCount: true },
        where: {
          isDeleted: false,
          sale: {
            date: {
              gte: dayjs()
                .year(year)
                .month(month - 1)
                .startOf('month')
                .toDate(),
              lte: dayjs()
                .year(year)
                .month(month - 1)
                .endOf('month')
                .toDate(),
            },
          },
          product: { id: device.id },
        },
      })

      const arrivedProductsMonth = await this.prisma.arrivedProduct.aggregate({
        _sum: { count: true, priceCount: true },
        where: {
          isDeleted: false,
          Arrived: {
            date: {
              gte: dayjs()
                .year(year)
                .month(month - 1)
                .startOf('month')
                .toDate(),
              lte: dayjs()
                .year(year)
                .month(month - 1)
                .endOf('month')
                .toDate(),
            },
          },
          Product: { id: device.id },
        },
      })

      remiderInStartOfMonth += saleProducts._sum.count || 0
      remiderInStartOfMonth -= arrivedProducts._sum.count || 0

      const numberOfDevicesSold = saleProductsMonth._sum.count || 0
      const priceOfDevicesSold = saleProductsMonth._sum.priceCount || 0

      const numberOfDevicesArrived = arrivedProductsMonth._sum.count || 0
      const priceOfDevicesArrived = arrivedProductsMonth._sum.priceCount || 0

      let remiderInEndOfMonth =
        remiderInStartOfMonth + numberOfDevicesArrived - numberOfDevicesSold

      priceOfTotalSold += priceOfDevicesSold
      priceOfTotalArrived += priceOfDevicesArrived

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
      })
    }

    const subscriptionProducts = await this.prisma.product.findMany({
      where: { isDeleted: false, type: 'SUBSCRIPTION' },
      orderBy: { name: 'asc' },
    })

    for (let subscriptionProduct of subscriptionProducts) {
      const subsciptions = await this.prisma.subscribe.aggregate({
        where: {
          isDeleted: false,
          sale: {
            SaleProduct: { some: { product: { id: subscriptionProduct.id } } },
          },
          paying_date: {
            gte: dayjs()
              .year(year)
              .month(month - 1)
              .startOf('month')
              .toDate(),
            lte: dayjs()
              .year(year)
              .month(month - 1)
              .endOf('month')
              .toDate(),
          },
        },
        _sum: { price: true, paid: true },
        _count: { id: true },
      })
      const numberOfSubscriptionsSold = subsciptions._count.id || 0
      const priceOfSubscriptionsSold = subsciptions._sum.price || 0

      priceOfTotalSold += priceOfSubscriptionsSold

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
      })
    }

    const services = await this.prisma.product.findMany({
      where: { isDeleted: false, type: 'SERVICE' },
      orderBy: { name: 'asc' },
    })

    for (let service of services) {
      const serviceSales = await this.prisma.saleProduct.aggregate({
        where: {
          isDeleted: false,
          product: { id: service.id },
          sale: {
            date: {
              gte: dayjs()
                .year(year)
                .month(month - 1)
                .startOf('month')
                .toDate(),
              lte: dayjs()
                .year(year)
                .month(month - 1)
                .endOf('month')
                .toDate(),
            },
          },
        },
        _sum: { priceCount: true, count: true },
      })
      const numberOfServicesSold = serviceSales._sum.count || 0
      const priceOfServicesSold = serviceSales._sum.priceCount || 0

      priceOfTotalSold += priceOfServicesSold

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
      })
    }

    return {
      rows,
      totals: {
        priceOfTotalSold,
        priceOfTotalArrived,
        profit: 0,
      },
    }
  }

  async exportAsExcel(year: number = dayjs().year(), month?: number) {
    const data = await this.exportAsJson(year, month)

    const excel = new Workbook()
    const sheet = excel.addWorksheet('Hisobot')
    sheet.columns = [
      {
        header: '#',
        width: 5,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Mahsulot Nomi',
        width: 20,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Mahsulot Turi',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Oy Boshlanishiga qoldiq',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Sotilgan',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Ummumiy Summasi',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Kelgan',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Ummumiy Summasi',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Foyda',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
      {
        header: 'Oy Oxiridagi Qoldiq',
        width: 10,
        alignment: { horizontal: 'center', vertical: 'middle' },
      },
    ]

    let sheetIndex = 1
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
      ])
      sheetIndex++
    }

    sheet.addRow([
      null,
      null,
      null,
      null,
      'Jami:',
      data.totals.priceOfTotalSold,
      null,
      data.totals.priceOfTotalArrived,
      data.totals.profit,
      null,
    ])

    const buffer = await excel.xlsx.writeBuffer()
    const rawData = new Uint8Array(buffer)
    return new StreamableFile(rawData, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  }

  async getStatistics(year: number = dayjs().year()) {
    if (year == 0) year = dayjs().year()
    const today = dayjs()
    const currentMonthStart = today.startOf('month').toDate()
    const currentMonthEnd = today.endOf('month').startOf('day').toDate()

    const startOfYear = dayjs().year(year).startOf('year').toDate()
    const endOfYear = dayjs().year(year).endOf('year').toDate()

    const startOfLastYear = dayjs()
      .year(year)
      .subtract(1, 'year')
      .startOf('year')
      .toDate()
    const endOfLastYear = dayjs()
      .year(year)
      .subtract(1, 'year')
      .endOf('year')
      .toDate()

    const sumOrZero = (agg: any, field: string) =>
      (agg && agg._sum && (agg._sum[field] ?? 0)) || 0

    const [settings, totalClients, totalSales] = await Promise.all([
      this.prisma.setting.findUnique({ where: { id: 1 } }),
      this.prisma.client.count({ where: { isDeleted: false } }), // "Mijozlar"
      this.prisma.sale.count({ where: { isDeleted: false } }), // "Shartnomalar" (use Sale)
    ])

    const [
      paidClientYearAgg,
      paidOtherIncomeYearAgg,
      paidSupplierYearAgg,
      arrivedYearAgg,
      paidServerYearAgg,
      paidOtherOutcomeYearAgg,
      saleDebtAgg,
      subscribeDeptAgg,
      paidClientCurrentMonthAgg,
      paidOtherIncomeCurrentMonthAgg,
      paidSupplierCurrentMonthAgg,

      paidServerCurrentMonthAgg,
      paidOtherOutcomeCurrentMonthAgg,
      lastYearPaidClientAgg,
      lastYearPaidOtherIncomeAgg,
    ] = await Promise.all([
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
    ])

    const yearlyIncome =
      sumOrZero(paidClientYearAgg, 'price') +
      sumOrZero(paidOtherIncomeYearAgg, 'price')
    const yearlyExpenses =
      sumOrZero(paidSupplierYearAgg, 'price') +
      sumOrZero(paidServerYearAgg, 'price') +
      sumOrZero(paidOtherOutcomeYearAgg, 'price')

    const currentMonthIncome =
      sumOrZero(paidClientCurrentMonthAgg, 'price') +
      sumOrZero(paidOtherIncomeCurrentMonthAgg, 'price')
    const currentMonthExpenses =
      sumOrZero(paidSupplierCurrentMonthAgg, 'price') +
      sumOrZero(paidServerCurrentMonthAgg, 'price') +
      sumOrZero(paidOtherOutcomeCurrentMonthAgg, 'price')

    const lastYearIncome =
      sumOrZero(lastYearPaidClientAgg, 'price') +
      sumOrZero(lastYearPaidOtherIncomeAgg, 'price')

    const clientDepts = await this.prisma.client.aggregate({
      _sum: { balance: true },
      where: {
        balance: { lt: 0 },
        isDeleted: false,
      },
    })

    const totalSaleDept = await this.prisma.sale.aggregate({
      _sum: { credit: true },
      where: {
        date: { gte: startOfYear, lte: endOfYear },
        isDeleted: false,
        client: { isDeleted: false },
      },
    })

    const totalSubDept = await this.prisma.subscribe.aggregate({
      _sum: { price: true, paid: true },
      where: {
        createdAt: { gte: startOfYear, lte: endOfYear },
        isDeleted: false,
        client: { isDeleted: false, balance: { lt: 0 } },
        sale: { isDeleted: false },
      },
    })

    const subPrice = sumOrZero(totalSubDept, 'price')
    const subPaid = sumOrZero(totalSubDept, 'paid')
    const expectedSubscription = Math.max(0, subPrice - subPaid)
    const saleCredit = sumOrZero(totalSaleDept, 'credit')

    const totalDebts = sumOrZero(clientDepts, 'balance')

    const monthlyStats = await Promise.all(
      Array.from({ length: 12 }, (_, i) => {
        const mStart = dayjs().year(year).month(i).startOf('month').toDate()
        const mEnd = dayjs()
          .year(year)
          .month(i)
          .add(1, 'month')
          .startOf('month')
          .toDate()

        return Promise.all([
          this.prisma.paidClient.aggregate({
            _sum: { price: true },
            where: { paidDate: { gte: mStart, lt: mEnd }, isDeleted: false },
          }),
          this.prisma.paidOther.aggregate({
            _sum: { price: true },
            where: {
              paidDate: { gte: mStart, lt: mEnd },
              type: 'INCOME',
              isDeleted: false,
            },
          }),
          this.prisma.paidSupplier.aggregate({
            _sum: { price: true },
            where: { paidDate: { gte: mStart, lt: mEnd }, isDeleted: false },
          }),

          this.prisma.paidServer.aggregate({
            _sum: { price: true },
            where: { createdAt: { gte: mStart, lt: mEnd }, isDeleted: false },
          }),
          this.prisma.paidOther.aggregate({
            _sum: { price: true },
            where: {
              paidDate: { gte: mStart, lt: mEnd },
              type: 'OUTCOME',
              isDeleted: false,
            },
          }),

          this.prisma.sale.aggregate({
            _sum: { credit: true },
            where: {
              date: { gte: mStart, lt: mEnd },
              isDeleted: false,
              client: { isDeleted: false },
            },
          }),

          this.prisma.subscribe.aggregate({
            _sum: { price: true, paid: true },
            where: {
              paying_date: { gte: mStart, lt: mEnd },
              isDeleted: false,
              client: { isDeleted: false },
              sale: { isDeleted: false },
            },
          }),

          this.prisma.saleProduct.aggregate({
            _sum: { count: true, priceCount: true },
            where: {
              sale: {
                date: { gte: mStart, lt: mEnd },
                isDeleted: false,
              },
              product: {
                type: { in: ['DEVICE'] },
                isDeleted: false,
              },
              isDeleted: false,
            },
          }),

          this.prisma.saleProduct.aggregate({
            _sum: { count: true, priceCount: true },
            where: {
              sale: {
                date: { gte: mStart, lt: mEnd },
                isDeleted: false,
              },
              product: {
                type: 'SERVICE',
                isDeleted: false,
              },
              isDeleted: false,
            },
          }),

          this.prisma.subscribe.aggregate({
            _sum: { paid: true },
            where: {
              paying_date: { gte: mStart, lt: mEnd },
              isDeleted: false,
              client: { isDeleted: false, balance: { lt: 0 } },
              sale: { isDeleted: false },
            },
          }),
        ]).then(
          ([
            pc,
            poInc,
            psup,
            pserv,
            poOut,
            saleDebtMonth,
            subAgg,
            productsSold,
            servicesSold,
            subDeptAgg,
          ]) => {
            const incomeMonth =
              sumOrZero(pc, 'price') + sumOrZero(poInc, 'price')
            const expenseMonth =
              sumOrZero(psup, 'price') +
              sumOrZero(pserv, 'price') +
              sumOrZero(poOut, 'price')

            const subPrice = sumOrZero(subAgg, 'price')
            const subPaid = sumOrZero(subAgg, 'paid')
            const expectedSubscription = Math.max(0, subPrice - subPaid)
            const saleCredit = sumOrZero(saleDebtMonth, 'credit')
            const subDept = sumOrZero(subDeptAgg, 'paid')
            const monthCredit = saleCredit + subDept

            return {
              month: i + 1,
              tushum: incomeMonth,
              chiqim: expenseMonth,
              expectedSubscription,
              productsSold: sumOrZero(productsSold, 'priceCount'),
              servicesSold: sumOrZero(servicesSold, 'priceCount'),
              subscriptionSold: subPrice,
              credit: monthCredit,
            }
          },
        )
      }),
    )

    const currentMonthIndex = today.month()
    let currentMonthExpectedSubscription =
      year === today.year()
        ? monthlyStats[currentMonthIndex]?.expectedSubscription || 0
        : 0

    if (currentMonthExpectedSubscription === 0) {
      for (let i = 1; i <= 3; i++) {
        const prevMonthIndex = currentMonthIndex - i
        if (prevMonthIndex >= 0) {
          const val = monthlyStats[prevMonthIndex]?.expectedSubscription || 0
          if (val > 0) {
            currentMonthExpectedSubscription = val
            break
          }
        } else {
          // If accessing previous year (e.g. Jan needing Dec/Nov/Oct)
          // prevMonthIndex is -1 (Dec), -2 (Nov), -3 (Oct) => +12 to get 0-11 index
          const targetMonth = 12 + prevMonthIndex
          const targetYear = year - 1

          const targetMonthStart = dayjs()
            .year(targetYear)
            .month(targetMonth)
            .startOf('month')
            .toDate()
          const targetMonthEnd = dayjs()
            .year(targetYear)
            .month(targetMonth)
            .add(1, 'month')
            .startOf('month')
            .toDate()

          const targetMonthSubAgg = await this.prisma.subscribe.aggregate({
            _sum: { price: true, paid: true },
            where: {
              paying_date: { gte: targetMonthStart, lt: targetMonthEnd },
              isDeleted: false,
              client: { isDeleted: false },
              sale: { isDeleted: false },
            },
          })
          const targetPrice = sumOrZero(targetMonthSubAgg, 'price')
          const targetPaid = sumOrZero(targetMonthSubAgg, 'paid')
          const val = Math.max(0, targetPrice - targetPaid)

          if (val > 0) {
            currentMonthExpectedSubscription = val
            break
          }
        }
      }
    }

    const monthlyStatsWithForecast = monthlyStats.map((m, index) => {
      let expectedForMonth = m.expectedSubscription

      if (
        year > today.year() ||
        (year === today.year() && index > currentMonthIndex)
      ) {
        expectedForMonth = currentMonthExpectedSubscription
      }

      return {
        ...m,
        expectedSubscription: expectedForMonth,
      }
    })

    const [currentMonthSaleDebt, currentMonthSubAgg] = await Promise.all([
      this.prisma.sale.aggregate({
        _sum: { credit: true },
        where: {
          date: { gte: currentMonthStart, lte: currentMonthEnd },
          isDeleted: false,
          client: { isDeleted: false },
        },
      }),
      this.prisma.subscribe.aggregate({
        _sum: { price: true, paid: true },
        where: {
          createdAt: { gte: currentMonthStart, lt: currentMonthEnd },
          isDeleted: false,
          client: { isDeleted: false, balance: { lt: 0 } },
          sale: { isDeleted: false },
        },
      }),
    ])

    const currentMonthSubPrice = sumOrZero(currentMonthSubAgg, 'price')
    const currentMonthSubPaid = sumOrZero(currentMonthSubAgg, 'paid')
    const currentMonthExpectedSub = Math.max(
      0,
      currentMonthSubPrice - currentMonthSubPaid,
    )
    const currentMonthSaleCredit = sumOrZero(currentMonthSaleDebt, 'credit')
    const currentMonthCredit = currentMonthSaleCredit + currentMonthSubPaid

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
        name: dayjs().format('MMMM'),
        income: currentMonthIncome,
        outcome: currentMonthExpenses,
        credit: currentMonthCredit,
      },
      charts: {
        monthlyStats: monthlyStatsWithForecast,
      },
    }
  }
}
