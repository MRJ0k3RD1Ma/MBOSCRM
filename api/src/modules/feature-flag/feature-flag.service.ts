import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FeatureFlagService implements OnModuleInit {
	constructor(private readonly prisma: PrismaService) {}

	private flags: Record<string, boolean> = {};

	async onModuleInit() {
		await this.loadFlags();

		await this.prisma.$executeRaw`LISTEN Access`;
		await this.prisma.subscriber.listenTo("Access");
		this.prisma.subscriber.notifications.on("Access", (data) => {
			this.flags[data.key] = data.isActive;
		});
	}

	isActive(key: string) {
		return this.flags[key] || true;
	}

	async loadFlags() {
		const accesses = await this.prisma.access.findMany({});
		for (let access of accesses) {
			this.flags[access.key] = access.isActive;
		}
	}
}
