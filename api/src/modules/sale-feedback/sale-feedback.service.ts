import { Injectable } from "@nestjs/common";
import { CreateSaleFeedbackDto } from "./dto/create-sale-feedback.dto";
import {
	UpdateSaleFeedbackDto,
	UpdateStateDto,
} from "./dto/update-sale-feedback.dto";
import { PrismaService } from "../prisma/prisma.service";
import { HttpError } from "../../common/exception/http.error";
import { Prisma, SaleFeedbackResult, SaleFeedbackState } from "@prisma/client";
import { FindAllSaleFeedbackDto } from "./dto/findAll-sale-feedback.dto";
import { hash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { SmsService } from "../sms/sms.service";
import { env } from "../../common/config";

@Injectable()
export class SaleFeedbackService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly smsService: SmsService,
	) {}
	async create(createSaleFeedbackDto: CreateSaleFeedbackDto) {
		const sale = await this.prisma.sale.findUnique({
			where: { id: createSaleFeedbackDto.saleId },
		});
		if (!sale) {
			throw new HttpError({ message: "Sale not found" });
		}
		const saleFeedback = await this.prisma.saleFeedback.create({
			data: {
				name: createSaleFeedbackDto.name,
				alias: hash("sha256", uuidv4(), "base64url").slice(0, 14),
				saleId: createSaleFeedbackDto.saleId,
				description: createSaleFeedbackDto.description,
				score: createSaleFeedbackDto.score,
				state: SaleFeedbackState.TODO,
				result: SaleFeedbackResult.NOT_COMPLETED,
			},
		});

		return saleFeedback;
	}

	async findAll(dto: FindAllSaleFeedbackDto) {
		const { page, limit, name, state, result, saleId } = dto;
		const where: Prisma.SaleFeedbackWhereInput = {
			isDeleted: false,
		};
		if (dto.name) {
			where.name = { contains: name, mode: "insensitive" };
		}
		if (dto.state) {
			where.state = state;
		}
		if (dto.result) {
			where.result = result;
		}

		if (dto.saleId) {
			where.saleId = saleId;
		}

		const [data, total] = await this.prisma.$transaction([
			this.prisma.saleFeedback.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			this.prisma.saleFeedback.count({ where }),
		]);
		return {
			data,
			total,
			page,
			limit,
		};
	}
	async findOne(id: number) {
		const saleFeedback = await this.prisma.saleFeedback.findFirst({
			where: {
				id,
				isDeleted: false,
			},
		});
		if (!saleFeedback) {
			throw new HttpError({
				message: `SaleFeedback with ID ${id} not found`,
			});
		}
		return saleFeedback;
	}

	async findOneByAlias(alias: string) {
		const saleFeedback = await this.prisma.saleFeedback.findFirst({
			where: {
				alias,
				isDeleted: false,
			},
		});
		if (!saleFeedback) {
			throw new HttpError({
				message: `SaleFeedback with alias ${alias} not found`,
			});
		}
		return saleFeedback;
	}

	async update(alias: string, updateSaleFeedbackDto: UpdateSaleFeedbackDto) {
		const saleFeedback = await this.prisma.saleFeedback.findFirst({
			where: { alias },
			include: { sale: { include: { client: true } } },
		});

		if (!saleFeedback) {
			throw new HttpError({ message: "SaleFeedback not found" });
		}
		if (
			saleFeedback.state !== SaleFeedbackState.WAITING &&
			updateSaleFeedbackDto.state === SaleFeedbackState.WAITING
		) {
			await this.smsService.sendMessage(
				saleFeedback.sale.client.phone,
				`Hurmatli mijoz! Iltimos, ishni bajargan xodimning ishiga baho bering: ${env.FRONTEND_URL}${saleFeedback.alias}`,
				env.MAIN_KEY,
			);
		}

		return this.prisma.saleFeedback.update({
			where: { id: saleFeedback.id },
			data: {
				name: updateSaleFeedbackDto.name ?? saleFeedback.name,
				description:
					updateSaleFeedbackDto.description ?? saleFeedback.description,
				saleId: saleFeedback.saleId,
				score: updateSaleFeedbackDto.score ?? saleFeedback.score,
				state: updateSaleFeedbackDto.state ?? saleFeedback.state,
				result: updateSaleFeedbackDto.result ?? saleFeedback.result,
			},
		});
	}

	async updateState(dto: UpdateStateDto, alias: string) {
		const saleFeedback = await this.prisma.saleFeedback.findFirst({
			where: { alias: alias },
		});
		if (!saleFeedback) {
			throw new HttpError({ message: "SaleFeedback not found" });
		}
		return this.prisma.saleFeedback.update({
			where: { id: saleFeedback.id },
			data: {
				state: dto.state,
			},
		});
	}

	async remove(id: number) {
		const saleFeedback = await this.prisma.saleFeedback.findFirst({
			where: { id, isDeleted: false },
		});
		if (!saleFeedback) {
			throw new HttpError({ message: "SaleFeedback not found" });
		}
		return this.prisma.saleFeedback.update({
			where: { id },
			data: { isDeleted: true },
		});
	}
}
