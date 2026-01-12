import { Injectable } from "@nestjs/common";
import { PaidSupplier, Prisma } from "@prisma/client";
import { HttpError } from "../../common/exception/http.error";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaidSupplierDto } from "./dto/create-paid-supplier.dto";
import { FindAllPaidSupplierQueryDto } from "./dto/findAll-paid-supplier.dto";
import { UpdatePaidSupplierDto } from "./dto/update-paid-supplier.dto";
import { env } from "../../common/config";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class PaidSupplierService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async onModuleInit() {
		if (env.ENV != "prod") {
			const count = await this.prisma.paidSupplier.count();
			const requiredCount = 5;
			if (count < requiredCount) {
				const supplier = await this.prisma.supplier.findFirst({
					where: { isDeleted: false },
				});
				if (!supplier) return;
				for (let i = count; i < requiredCount; i++) {
					await this.create(
						{
							paymentId: 1,
							price: 100,
							supplierId: supplier.id,
							paidDate: new Date(),
						},
						1,
					);
				}
			}
		}
	}

	async create(
		createPaidSupplierDto: CreatePaidSupplierDto,
		creatorId: number,
	) {
		const { paymentId, price, supplierId, paidDate } = createPaidSupplierDto;
		const payment = await this.prisma.payment.findFirst({
			where: { id: paymentId, isDeleted: false },
		});
		if (!payment) {
			throw new HttpError({ message: "Payment Not Found" });
		}

		const supplier = await this.prisma.supplier.findFirst({
			where: { id: supplierId, isDeleted: false },
		});
		if (!supplier) {
			throw new HttpError({ message: "Supplier Not Found", code: 404 });
		}

		await this.prisma.setting.update({
			where: { id: 1 },
			data: { balance: { decrement: price } },
		});
		await this.prisma.supplier.update({
			where: { id: supplierId },
			data: { balance: { increment: price } },
		});
		const paidsupplier = await this.prisma.paidSupplier.create({
			data: {
				supplierId,
				paidDate,
				price,
				paymentId,
				modifyId: creatorId,
				registerId: creatorId,
			},
		});
		this.eventEmitter.emit("recalculate.supplier", supplierId);
		return paidsupplier;
	}

	async findAll(dto: FindAllPaidSupplierQueryDto) {
		const {
		  limit = 10,
		  page = 1,
		  maxPaidDate,
		  minPaidDate,
		  supplierId,
		  paymentId,
		} = dto;
	  
		const where: Prisma.PaidSupplierWhereInput = {
		  isDeleted: false,
		};
	  
		if (supplierId !== undefined) {
		  where.supplierId = supplierId;
		}
	  
		if (paymentId !== undefined) {
		  where.paymentId = paymentId;
		}
	  
		if (minPaidDate || maxPaidDate) {
		  where.paidDate = {
			...(minPaidDate && { gte: minPaidDate }),
			...(maxPaidDate && { lte: maxPaidDate }),
		  };
		}
	  
		const [data, agg] = await this.prisma.$transaction([
		  this.prisma.paidSupplier.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			orderBy: { id: "desc" },
			include: { Payment: true, register: true, modify: true },
		  }),
		  this.prisma.paidSupplier.aggregate({
			where,
			_sum: { price: true },
			_count: { _all: true },
		  }),
		]);
	  
		return {
		  total: agg._count._all,
		  price: agg._sum.price,
		  page,
		  limit,
		  data,
		};
	  }
	  

	async findOne(id: number) {
		const paidSupplier = await this.prisma.paidSupplier.findFirst({
			where: {
				id,
				isDeleted: false,
			},
			include: {
				register: true,
				Payment: true,
				modify: true,
			},
		});
		if (!paidSupplier) {
			throw HttpError({ code: "PaidSupplier not found" });
		}
		return paidSupplier;
	}

	async update(id: number, dto: UpdatePaidSupplierDto) {
		const paidsupplier = await this.prisma.paidSupplier.findFirst({
			where: { id, isDeleted: false },
		});
		if (!paidsupplier) throw HttpError({ code: "PaidSupplier not found" });

		const updateData: Partial<PaidSupplier> = {
			price: dto.price ?? paidsupplier.price,
			paidDate: dto.paidDate ?? paidsupplier.paidDate,
		};

		const updatedPaidSupplier = await this.prisma.paidSupplier.update({
			where: { id },
			data: updateData,
		});

		this.eventEmitter.emit("recalculate.supplier", paidsupplier.supplierId);

		return updatedPaidSupplier;
	}

	async remove(id: number, modifierId: number) {
		let paidsupplier: any = await this.prisma.paidSupplier.findFirst({
			where: { id: id, isDeleted: false },
		});
		if (!paidsupplier) {
			throw HttpError({ code: "PaidSupplier not found" });
		}
		this.eventEmitter.emit("recalculate.supplier", paidsupplier.supplierId);

		paidsupplier = await this.prisma.paidSupplier.update({
			where: { id: id },
			data: { isDeleted: true, modifyId: modifierId },
		});
		return paidsupplier;
	}
}
