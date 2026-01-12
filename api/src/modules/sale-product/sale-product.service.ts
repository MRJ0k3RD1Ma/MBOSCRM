import { Injectable } from "@nestjs/common";
import { CreateSaleProductDto } from "./dto/create-sale-product.dto";
import { UpdateSaleProductDto } from "./dto/update-sale-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { HttpError } from "../../common/exception/http.error";
import { FindAllSaleProductQueryDto } from "./dto/findAll-sale-product-query.dto";
import { Prisma, ProductType, SaleState } from "@prisma/client";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class SaleProductService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2,
	) { }

	async create(createSaleProductDto: CreateSaleProductDto, creatorId: number) {
		const sale = await this.prisma.sale.findFirst({
			where: { id: createSaleProductDto.saleId },
		});
		if (!sale) {
			throw new HttpError({
				message: `Sale with ID ${createSaleProductDto.saleId} not found`,
			});
		}

		const product = await this.prisma.product.findFirst({
			where: { id: createSaleProductDto.productId },
		});
		if (!product) {
			throw new HttpError({
				message: `Product with ID ${createSaleProductDto.productId} not found`,
			});
		}

		if (
			product.countReminder < createSaleProductDto.count &&
			product.type === "DEVICE"
		) {
			throw new HttpError({
				message: `Maxsulot soni yetarli emas`,
			});
		}

		const isSubscription = product.type == ProductType.SUBSCRIPTION;
		let priceCount =
			(createSaleProductDto.price || product.price) *
			createSaleProductDto.count;
		if (isSubscription) {
			priceCount = 0;
		}

		const saleProduct = await this.prisma.saleProduct.create({
			data: {
				saleId: createSaleProductDto.saleId,
				productId: createSaleProductDto.productId,
				count: createSaleProductDto.count,
				price: createSaleProductDto.price || product.price,
				priceCount,
				is_subscribe: isSubscription,
				registerId: creatorId,
				modifyId: creatorId,
			},
			include: { product: true },
		});

		await this.prisma.sale.update({
			where: { id: sale.id },
			data: {
				price: { increment: priceCount },
				credit: { increment: priceCount },
				state: SaleState.RUNNING,
			},
		});

		if (product.type == "DEVICE") {
			await this.prisma.product.update({
				where: { id: product.id },
				data: {
					countReminder: {
						decrement: createSaleProductDto.count,
					},
					countSale: {
						increment: createSaleProductDto.count,
					},
					modifyId: creatorId,
				},
			});
		}

		this.eventEmitter.emit("recalculate.product", product.id);

		return saleProduct;
	}

	async findAll(dto: FindAllSaleProductQueryDto) {
		const { limit = 10, page = 1, saleId, clientId, productId, isSubscribe } = dto;
	  
		const where: Prisma.SaleProductWhereInput = { isDeleted: false };
	  
		if (saleId !== undefined) where.saleId = saleId;
		if (clientId !== undefined) where.sale = { clientId };
		if (productId !== undefined) where.productId = productId;
		if (isSubscribe !== undefined) where.is_subscribe = { equals: isSubscribe };
	  
		const [data, total] = await this.prisma.$transaction([
		  this.prisma.saleProduct.findMany({
			where,
			skip: (page - 1) * limit,
			take: limit,
			include: {
			  product: { include: { ProductUnit: true } },
			  sale: true,
			  modify: true,
			  register: true,
			},
			orderBy: { id: "desc" },
		  }),
		  this.prisma.saleProduct.count({ where }),
		]);
	  
		return { total, page, limit, data };
	  }
	  

	async findOne(id: number) {
		const saleProduct = await this.prisma.saleProduct.findFirst({
			where: { id, isDeleted: false },

			include: { product: true },
		});
		if (!saleProduct) {
			throw new HttpError({
				message: `SaleProduct with ID ${id} not found`,
			});
		}
		return saleProduct;
	}

	async update(
		id: number,
		updateSaleProductDto: UpdateSaleProductDto,
		modifyId: number,
	) {
		const saleProduct = await this.prisma.saleProduct.findFirst({
			where: { id, isDeleted: false },
		});
		if (!saleProduct) {
			throw new HttpError({ message: `SaleProduct with ID ${id} not found` });
		}

		if (updateSaleProductDto.saleId) {
			const sale = await this.prisma.sale.findFirst({
				where: { id: updateSaleProductDto.saleId },
			});
			if (!sale) {
				throw new HttpError({
					message: `Sale with ID ${updateSaleProductDto.saleId} not found`,
				});
			}
		}

		let product = null;
		if (updateSaleProductDto.productId) {
			product = await this.prisma.product.findFirst({
				where: { id: updateSaleProductDto.productId },
			});
			if (!product) {
				throw new HttpError({
					message: `Product with ID ${updateSaleProductDto.productId} not found`,
				});
			}
		}

		const finalPrice =
			product?.price ?? updateSaleProductDto.price ?? saleProduct.price;
		const finalCount = updateSaleProductDto.count ?? saleProduct.count;
		const totalPriceCount = finalPrice * finalCount;

		const isSubscribe = product
			? product.type === "SUBSCRIPTION" || product.type === "SERVICE"
			: saleProduct.is_subscribe;

		const updatedProduct = await this.prisma.saleProduct.update({
			where: { id },
			data: {
				saleId: updateSaleProductDto.saleId ?? saleProduct.saleId,
				productId: updateSaleProductDto.productId ?? saleProduct.productId,
				count: finalCount,
				price: finalPrice,
				priceCount: totalPriceCount,
				is_subscribe: isSubscribe,
				modifyId: modifyId,
			},
		});

		this.eventEmitter.emit(
			"recalculate.product",
			updateSaleProductDto.productId ?? saleProduct.productId,
		);

		return updatedProduct;
	}

	async remove(id: number) {
		const saleProduct = await this.prisma.saleProduct.findFirst({
			where: { id, isDeleted: false },
		});
		if (!saleProduct) {
			throw new HttpError({ message: `SaleProduct with ID ${id} not found` });
		}
		if (saleProduct.is_subscribe) {
			await this.prisma.subscribe.updateMany({
				where: { saleId: saleProduct.saleId },
				data: { isDeleted: true },
			});
		}

		const sale = await this.prisma.sale.findFirst({
			where: { id: saleProduct.saleId },
		});

		const productPrice = saleProduct.priceCount;
		const totalSalePrice = sale.price;
		const paidAmount = sale.dept;
		const unpaidAmount = sale.credit;

		const paidRatio = totalSalePrice > 0 ? paidAmount / totalSalePrice : 0;
		const productPaidPortion = Math.round(productPrice * paidRatio);
		const productUnpaidPortion = productPrice - productPaidPortion;

		await this.prisma.sale.update({
			where: { id: saleProduct.saleId },
			data: {
				price: { decrement: productPrice },
				dept: { decrement: productPaidPortion },
				credit: { decrement: productUnpaidPortion },
			},
		});

		if (productPaidPortion > 0) {
			await this.prisma.client.update({
				where: { id: sale.clientId },
				data: { balance: { increment: productPaidPortion } },
			});
		}

		this.eventEmitter.emit("recalculate.client", sale.clientId);
		this.eventEmitter.emit("recalculate.product", saleProduct.productId);

		return await this.prisma.saleProduct.update({
			where: { id },
			data: { isDeleted: true },
		});
	}
}
