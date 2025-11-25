import { IsName } from "../../../common/dtos/name.dto";

export class SendMessageDto {
	@IsName()
	mobile_phone: string;

	@IsName()
	message: string;
}
