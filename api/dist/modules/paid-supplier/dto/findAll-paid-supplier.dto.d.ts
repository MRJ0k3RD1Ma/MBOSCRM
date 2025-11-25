import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllPaidSupplierQueryDto extends PaginationDto {
    supplierId: number;
    paymentId: number;
    maxPaidDate: Date;
    minPaidDate: Date;
}
