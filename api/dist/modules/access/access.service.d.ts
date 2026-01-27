import { PrismaService } from '../prisma/prisma.service';
import { FindAllAccessQueryDto } from './dto/findAll-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
export declare class AccessService {
    private readonly prisma;
    private readonly featureFlagService;
    constructor(prisma: PrismaService, featureFlagService: FeatureFlagService);
    private axios;
    cron(): Promise<void>;
    onModuleInit(): Promise<void>;
    findAll(dto: FindAllAccessQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            description: string;
            name: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            key: string;
            updatedTime: Date;
            isActive: boolean;
        }[];
    }>;
    findOne(id: number): Promise<{
        description: string;
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        key: string;
        updatedTime: Date;
        isActive: boolean;
    }>;
    update(id: number, dto: UpdateAccessDto): Promise<{
        description: string;
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        key: string;
        updatedTime: Date;
        isActive: boolean;
    }>;
}
