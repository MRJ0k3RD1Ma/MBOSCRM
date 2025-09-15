import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllUserQueryDto extends PaginationDto {
    name?: string;
    phone?: string;
    username?: string;
    roleId?: number;
    chatId?: string;
}
