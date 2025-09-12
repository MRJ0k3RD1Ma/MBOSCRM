import { UpdatePaymeDto } from './dto/update-payme.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PaymeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkPerformTransaction(params: any, id: string): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymeDto: UpdatePaymeDto): string;
    remove(id: number): string;
}
