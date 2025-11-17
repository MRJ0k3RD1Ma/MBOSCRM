import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateSubscribeDto } from "./dto/create-subscribe.dto";
import { UpdateSubscribeDto } from "./dto/update-subscribe.dto";
import { PrismaService } from "../prisma/prisma.service";
import { HttpError } from "src/common/exception/http.error";
import { FindAllSubscribeQueryDto } from "./dto/findAll-subscribe-query.dto";
import { Prisma, ProductType, Sale, SubscribeState } from "@prisma/client";
import { Cron } from "@nestjs/schedule";
import dayjs from "dayjs";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { SmsService } from "../sms/sms.service";

@Injectable()
export class SubscribeService implements OnModuleInit {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
		private readonly smsService: SmsService,
	) {}
	async onModuleInit() {
		await this.cron();
	}

	@OnEvent("recalculate.subscribe")
	async handleSaleCreatedEvent(sale: Sale & { SaleProduct: any[] }) {
		const saleProduct = await this.prisma.saleProduct.findFirst({
			where: {
				saleId: sale.id,
				product: { type: ProductType.SUBSCRIPTION },
			},
		});

		if (!saleProduct) {
			return;
		}

		let loopMonth = dayjs(sale.subscribe_begin_date)
			.startOf("month")
			.set("date", sale.subscribe_generate_day);

		while (
			loopMonth.isSame(dayjs(), "month") ||
			loopMonth.isBefore(dayjs(), "month")
		) {
			const client = await this.prisma.client.findUnique({
				where: { id: sale.clientId },
			});
			await this.create({
				clientId: client.id,
				price: saleProduct.price * saleProduct.count,
				saleId: sale.id,
				payingDate: loopMonth.toDate(),
			});

			loopMonth = loopMonth.add(1, "months");
		}
	}

	@Cron("0 0 * * * *")
	async cron() {
		const runningSales = await this.prisma.sale.findMany({
			where: {
				isDeleted: false,
				state: "RUNNING",
			},
		});

		for (const sale of runningSales) {
			const client = await this.prisma.client.findUnique({
				where: { id: sale.clientId, isDeleted: false },
			});
			if (!client) {
				continue;
			}
			const lastSubscribe = await this.prisma.subscribe.findFirst({
				where: { saleId: sale.id },
				orderBy: { paying_date: "desc" },
				include: { client: true, sale: true },
			});

			if (!lastSubscribe) {
				const saleProduct = await this.prisma.saleProduct.findFirst({
					where: {
						saleId: sale.id,
						product: { type: ProductType.SUBSCRIPTION },
					},
				});

				if (saleProduct) {
					let loopMonth = dayjs(sale.subscribe_begin_date)
						.startOf("month")
						.set("day", sale.subscribe_generate_day);

					while (
						loopMonth.isSame(dayjs(), "month") ||
						loopMonth.isBefore(dayjs(), "month")
					) {
						await this.create({
							clientId: sale.clientId,
							price: saleProduct.price * saleProduct.count,
							saleId: sale.id,
							payingDate: loopMonth.toDate(),
						});

						loopMonth = loopMonth.add(1, "months");
					}
				}
				continue;
			}

			const today = dayjs();
			const nextPaymentDate = dayjs(lastSubscribe.paying_date).add(1, "month");

			const fiveDaysBeforePayment = nextPaymentDate.subtract(5, "days");

			if (
				fiveDaysBeforePayment.isBefore(today) &&
				lastSubscribe.alerted === false &&
				lastSubscribe.client.balance < lastSubscribe.price
			) {
				const saleProduct = await this.prisma.saleProduct.findFirst({
					where: {
						saleId: sale.id,
						product: { type: ProductType.SUBSCRIPTION },
					},
					include: { product: true },
				});

				await this.smsService.sendMessage(
					lastSubscribe.client.phone,
					`Hayrli kun! ${saleProduct.product.name} uchun 5 kun ichida to'lov qilmasangiz bu xizmat o'chirilishini ma'lum qilamiz. Qarzdorlik: ${lastSubscribe.client.balance - lastSubscribe.price} Tel: +998622277676 mbos.uz`,
				);
				this.prisma.subscribe.update({
					where: { id: lastSubscribe.id },
					data: { alerted: true },
				});
			}

			if (
				nextPaymentDate.isBefore(today) ||
				nextPaymentDate.isSame(today, "day")
			) {
				const saleProduct = await this.prisma.saleProduct.findFirst({
					where: {
						saleId: sale.id,
						product: { type: ProductType.SUBSCRIPTION },
					},
				});

				if (saleProduct) {
					await this.create({
						clientId: sale.clientId,
						price: saleProduct.price * saleProduct.count,
						saleId: sale.id,
						payingDate: nextPaymentDate.toDate(),
					});
				}
			}
		}
	}

	async create(createSubscribeDto: CreateSubscribeDto) {
		const { clientId, price, saleId, payingDate } = createSubscribeDto;

		const client = await this.prisma.client.findFirst({
			where: { id: clientId, isDeleted: false },
		});

		if (!client) {
			throw new HttpError({
				message: `Client with ID ${clientId} not found`,
			});
		}

		const sale = await this.prisma.sale.findFirst({
			where: { id: saleId, isDeleted: false },
		});

		if (!sale) {
			throw new HttpError({
				message: `Sale with ID ${saleId} not found`,
			});
		}

		const subscribe = await this.prisma.subscribe.create({
			data: {
				paid: price,
				paying_date: payingDate,
				price,
				state: "PAID",
				sale: { connect: { id: saleId } },
				client: { connect: { id: clientId } },
			},
		});
		await this.prisma.client.update({
			where: { id: clientId },
			data: { balance: client.balance - price },
		});

		this.eventEmitter.emit("recalculate.client", subscribe.clientId);

		return subscribe;
	}

	async findAll(dto: FindAllSubscribeQueryDto) {
		const {
			limit = 10,
			page = 1,
			minPrice,
			maxPrice,
			fromDate,
			toDate,
			clientId,
			state,
			saleId,
		} = dto;

		const where: Prisma.SubscribeWhereInput = {
			isDeleted: false,
		};
		if (clientId) {
			where.clientId = clientId;
		}
		if (saleId) {
			where.saleId = saleId;
		}
		if (minPrice || maxPrice) {
			where.price = {
				...(minPrice && { gte: minPrice }),
				...(maxPrice && { lte: maxPrice }),
			};
		}
		if (fromDate || toDate) {
			where.paying_date = {
				...(fromDate && { gte: fromDate }),
				...(toDate && { lte: toDate }),
			};
		}
		if (state) {
			where.state = { equals: state };
		}

		const [data, total] = await this.prisma.$transaction([
			this.prisma.subscribe.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				include: {
					client: true,
					sale: {
						include: {
							PaidClient: {
								include: { Payment: true },
							},
						},
					},
				},
				orderBy: { id: "desc" },
			}),
			this.prisma.subscribe.count({ where }),
		]);

		return {
			total,
			page,
			limit,
			data,
		};
	}

	async findOne(id: number) {
		const subscribe = await this.prisma.subscribe.findFirst({
			where: {
				id,
				isDeleted: false,
			},
			include: {
				client: true,
				sale: {
					include: {
						PaidClient: {
							include: { Payment: true },
						},
						SaleProduct: {
							include: { product: true },
							where: { product: { type: ProductType.SUBSCRIPTION } },
						},
					},
				},
			},
		});
		if (!subscribe) {
			throw new HttpError({
				message: `Subscribe with ID ${id} not found`,
			});
		}
		return subscribe;
	}

	async update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
		let subscribe = await this.prisma.subscribe.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!subscribe) {
			throw new HttpError({
				message: `Subscribe with ID ${id} not found`,
			});
		}
		subscribe = await this.prisma.subscribe.update({
			where: { id },
			data: {
				paying_date: updateSubscribeDto.payingDate ?? subscribe.paying_date,
				paid: updateSubscribeDto.paid ?? subscribe.paid,
				price: updateSubscribeDto.price ?? subscribe.price,
				state: updateSubscribeDto.state ?? subscribe.state,
			},
		});

		return subscribe;
	}

	async remove(id: number) {
		const subscribe = await this.prisma.subscribe.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!subscribe) {
			throw new HttpError({
				message: `Subscribe with ID ${id} not found`,
			});
		}
		this.eventEmitter.emit("recalculate.client", subscribe.clientId);

		return this.prisma.subscribe.update({
			where: { id },
			data: { isDeleted: true },
		});
	}
}
