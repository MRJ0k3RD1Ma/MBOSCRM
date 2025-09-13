import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { env } from "src/common/config";

@Injectable()
export class SmsService implements OnModuleInit {
	constructor(private readonly prisma: PrismaService) {}

	async onModuleInit() {}

	async sendMessage(mobile_phone: string, message: string, crm_key?: string) {
		if (env.IS_MAIN) {
			if (!crm_key) throw new Error("crm_key is required");
			const clientCrm = await this.prisma.clientCrm.findFirst({
				where: { key: crm_key },
			});
			if (!clientCrm) throw new Error("crm_key is invalid");

			await this.prisma.detailization.create({
				data: {
					message,
					phone_number: mobile_phone,
					clientId: clientCrm.clientId,
					crmId: clientCrm.id,
				},
			});
		} else {
		}
	}
}
