import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { env } from "src/common/config";
import Axios from "axios";
import { encrypt } from "src/common/utils/hash/hashing.utils";
import { Cron } from "@nestjs/schedule";
import { EskizService } from "../eskiz/eskiz.service";
import { FeatureFlagService } from "../feature-flag/feature-flag.service";
import { HttpError } from "src/common/exception/http.error";

@Injectable()
export class SmsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly eskizService: EskizService,
		private readonly featureFlagService: FeatureFlagService,
	) {}

	private axios = env.IS_MAIN
		? undefined
		: Axios.create({
				baseURL: env.MAIN_BACKEND_URL,
				headers: { "x-api-key": encrypt(env.MAIN_KEY) },
			});

	@Cron("* * * * *")
	async cron() {
		console.log(env.IS_MAIN);
		if (!env.IS_MAIN) return;
		const messagesToSend = await this.prisma.detailization.findMany({
			where: { state: "NEW" },
		});
		for (let message of messagesToSend) {
			await this.eskizService.sendMessage(message);
		}
	}

	async sendMessage(mobile_phone: string, message: string, crm_key?: string) {
		if (env.IS_MAIN) {
			const clientCrm = await this.prisma.clientCrm.findFirst({
				where: { key: crm_key },
			});

			return await this.prisma.detailization.create({
				data: {
					message,
					phone_number: mobile_phone,
					clientId: clientCrm?.clientId,
					crmId: clientCrm?.id,
				},
			});
		} else if (this.featureFlagService.isActive("sms")) {
			const { data } = await this.axios.post("/api/sms/send", {
				mobile_phone,
				message,
			});

			return data;
		} else {
			throw new HttpError({
				statusCode: "403",
				message: "Sms is not enabled",
				code: "SMS_NOT_ENABLED",
			});
		}
	}
}
