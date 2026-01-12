import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { HttpError } from "../../common/exception/http.error";
import { Prisma } from "@prisma/client";
import { CreateArrivedProductDto } from "./dto/create-arrived-product.dto";
import { FindAllArrivedProductQueryDto } from "./dto/findAll-arrived-product-query.dto";
import { UpdateArrivedProductDto } from "./dto/update-arrived-product.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class ArrivedProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) {}
	async create(
		createArrivedProductDto: CreateArrivedProductDto,
		registerId: number,
	) {
		let { arrivedId, count, productId, price } = createArrivedProductDto;

		if (!arrivedId) {
			throw new HttpError({
				message: `arrived Id it not defined`,
			});
		}

		const arrived = await this.prisma.arrived.findFirst({
			where: { id: arrivedId, isDeleted: false },
		});
		if (!arrived) {
			throw new HttpError({
				message: `Arrived with ID ${arrivedId} not found`,
			});
		}

		const product = await this.prisma.product.findFirst({
			where: { id: productId, isDeleted: false },
		});
		if (!product) {
			throw new HttpError({
				message: `Product with ID ${productId} not found`,
			});
		}

		price = price || product.priceIncome;

		const arrivedproduct = await this.prisma.arrivedProduct.create({
			data: {
				count,
				price,
				priceCount: price * count,
				arrivedId,
				productId,
				registerId,
			},
		});

		await this.prisma.product.update({
			where: { id: productId },
			data: {
				countArrived: {
					increment: count,
				},
				countReminder: {
					increment: count,
				},
			},
		});

		this.eventEmitter.emit("recalculate.arrived", arrived.id);
		this.eventEmitter.emit("recalculate.product", productId);

		return arrivedproduct;
	}

	async findAll(dto: FindAllArrivedProductQueryDto) {
		const {
		  limit = 10,
		  page = 1,
		  minPrice,
		  maxPrice,
		  productId,
		  supplierId,
		  arrivedId,
		} = dto;
	  
		const where: Prisma.ArrivedProductWhereInput = {
		  isDeleted: false,
		};
	  
		if (supplierId !== undefined) {
		  where.Arrived = { supplierId };
		}
	  
		if (arrivedId !== undefined) {
		  where.arrivedId = arrivedId;
		}
	  
		if (productId !== undefined) {
		  where.productId = productId;
		}
	  
		if (minPrice !== undefined || maxPrice !== undefined) {
		  where.price = {
			...(minPrice !== undefined && { gte: minPrice }),
			...(maxPrice !== undefined && { lte: maxPrice }),
		  };
		}
	  
		const [data, total] = await this.prisma.$transaction([
		  this.prisma.arrivedProduct.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			include: {
			  Arrived: { include: { supplier: true } },
			  Product: { include: { ProductUnit: true } },
			  register: true,
			},
			orderBy: { id: "desc" },
		  }),
		  this.prisma.arrivedProduct.count({ where }),
		]);
	  
		return {
		  total,
		  page,
		  limit,
		  data,
		};
	  }
	  

	async findOne(id: number) {
		const arrivedproduct = await this.prisma.arrivedProduct.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!arrivedproduct) {
			throw new HttpError({
				message: `ArrivedProduct with ID ${id} not found`,
			});
		}
		return arrivedproduct;
	}

	async update(id: number, updateArrivedProductDto: UpdateArrivedProductDto) {
		let arrivedproduct: any = await this.prisma.arrivedProduct.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!arrivedproduct) {
			throw new HttpError({
				message: `ArrivedProduct with ID ${id} not found`,
			});
		}

		arrivedproduct = await this.prisma.arrivedProduct.update({
			where: { id },
			data: {
				price: updateArrivedProductDto.price || arrivedproduct.price,
				count: updateArrivedProductDto.count || arrivedproduct.count,
				priceCount:
					(updateArrivedProductDto.price || arrivedproduct.price) *
						(updateArrivedProductDto.count || arrivedproduct.count) ||
					arrivedproduct.priceCount,
			},
		});

		this.eventEmitter.emit("recalculate.arrived", arrivedproduct.arrivedId);
		this.eventEmitter.emit("recalculate.product", arrivedproduct.productId);
		return arrivedproduct;
	}

	async remove(id: number) {
		let arrivedproduct: any = await this.prisma.arrivedProduct.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!arrivedproduct) {
			throw new HttpError({
				message: `ArrivedProduct with ID ${id} not found`,
			});
		}
		arrivedproduct = this.prisma.arrivedProduct.update({
			where: { id },
			data: { isDeleted: true },
		});

		this.eventEmitter.emit("recalculate.arrived", arrivedproduct.arrivedId);
		this.eventEmitter.emit("recalculate.product", arrivedproduct.productId);
		return arrivedproduct;
	}
}
