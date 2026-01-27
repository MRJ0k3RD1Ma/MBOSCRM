import { PrismaService } from "../prisma/prisma.service";
import { CreateSimCardDto } from "./dto/create-sim-card.dto";
import { FindAllSimCardQueryDto } from "./dto/findAll-sim-card.dto";
import { UpdateSimCardDto } from "./dto/update-sim-card.dto";
export declare class SimCardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSimCardDto: CreateSimCardDto): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    findAll(dto: FindAllSimCardQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                description: string | null;
                name: string;
                phone: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                balance: number;
                inn: string;
                address: string | null;
                regionId: number | null;
                districtId: number | null;
                typeId: number | null;
                registerId: number | null;
                modifyId: number | null;
            };
        } & {
            description: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
            isActive: boolean;
            company: string;
            activeDate: Date;
            phoneNumber: string;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            inn: string;
            address: string | null;
            regionId: number | null;
            districtId: number | null;
            typeId: number | null;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    update(id: number, dto: UpdateSimCardDto): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
}
