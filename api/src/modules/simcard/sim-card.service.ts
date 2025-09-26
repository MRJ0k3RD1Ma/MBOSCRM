import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, SimCard } from "@prisma/client";
import { HttpError } from "src/common/exception/http.error";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSimCardDto } from "./dto/create-sim-card.dto";
import { FindAllSimCardQueryDto } from "./dto/findAll-sim-card.dto";
import { UpdateSimCardDto } from "./dto/update-sim-card.dto";

@Injectable()
export class SimCardService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createSimCardDto: CreateSimCardDto) {
		const client = await this.prisma.client.findFirst({
			where: { id: createSimCardDto.clientId, isDeleted: false },
		});
		if (!client) {
			throw HttpError({ code: "Client Not Found" });
		}

		const simCard = await this.prisma.simCard.create({
			data: {
				clientId: client.id,
				company: createSimCardDto.company,
				phoneNumber: createSimCardDto.phoneNumber,
				description: createSimCardDto.description,
				activeDate: createSimCardDto.activeDate,
				isActive: createSimCardDto.isActive,
			},
		});
		return simCard;
	}

	async findAll(dto: FindAllSimCardQueryDto) {
		const {
			limit = 10,
			page = 1,
			clientId,
			company,
			description,
			isActive,
			phoneNumber,
		} = dto;

		const where: Prisma.SimCardWhereInput = {
			isDeleted: false,
		};

		if (company?.trim()) {
			where.company = { contains: company.trim(), mode: "insensitive" };
		}

		if (description?.trim()) {
			where.description = { contains: description.trim(), mode: "insensitive" };
		}

		if (phoneNumber?.trim()) {
			where.phoneNumber = { contains: phoneNumber.trim(), mode: "insensitive" };
		}

		if (isActive !== undefined) {
			where.isActive = isActive;
		}

		if (clientId) {
			where.clientId = clientId;
		}

		const [data, total] = await this.prisma.$transaction([
			this.prisma.simCard.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { id: "desc" },
				include: {
					client: true,
				},
			}),
			this.prisma.simCard.count({ where }),
		]);
		return {
			total,
			page,
			limit,
			data,
		};
	}

	async findOne(id: number) {
		const simCard = await this.prisma.simCard.findFirst({
			where: { id, isDeleted: false },
			include: { client: true },
		});
		if (!simCard) {
			throw HttpError({ code: "Sim Card not found" });
		}
		return simCard;
	}

	async update(id: number, dto: UpdateSimCardDto) {
		const simCard = await this.prisma.simCard.findFirst({
			where: { id, isDeleted: false },
		});
		if (!simCard) throw HttpError({ code: "Sim Card not found" });

		const updateData: Partial<SimCard> = {
			activeDate: dto.activeDate ?? simCard.activeDate,
			company: dto.company ?? simCard.company,
			description: dto.description ?? simCard.description,
			phoneNumber: dto.phoneNumber ?? simCard.phoneNumber,
			isActive: dto.isActive ?? simCard.isActive,
		};

		const updatedSimCard = await this.prisma.simCard.update({
			where: { id },
			data: updateData,
		});

		return updatedSimCard;
	}

	async remove(id: number) {
		const simCard = await this.prisma.simCard.findFirst({
			where: { id: id, isDeleted: false },
		});
		if (!simCard) {
			throw HttpError({ code: "Sim Card not found" });
		}
		return await this.prisma.simCard.update({
			where: { id: id },
			data: { isDeleted: true },
		});
	}
}
