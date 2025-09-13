import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { HttpError } from "src/common/exception/http.error";
import { decrypt } from "../utils/hash/hashing.utils";

export class CrmAuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			let apiKey = request.headers["x-api-key"];

			if (!apiKey) {
				HttpError({ code: "API_KEY_NOT_PROVIDED" });
			}

			const crm_key: any = decrypt(apiKey);
			if (!crm_key) HttpError({ code: "LOGIN_FAILED" });

			request.crm = {
				key: crm_key,
			};
			return true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
