import { SimCardService } from './sim-card.service';
import { CreateSimCardDto } from './dto/create-sim-card.dto';
import { FindAllSimCardQueryDto } from './dto/findAll-sim-card.dto';
import { UpdateSimCardDto } from './dto/update-sim-card.dto';
export declare class SimCardController {
    private readonly simCardService;
    constructor(simCardService: SimCardService);
    create(createSimCardDto: CreateSimCardDto): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    findAll(query: FindAllSimCardQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                description: string | null;
                name: string;
                phone: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
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
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            clientId: number;
            isActive: boolean;
            company: string;
            activeDate: Date;
            phoneNumber: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        client: {
            description: string | null;
            name: string;
            phone: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    update(id: string, updateSimCardDto: UpdateSimCardDto): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        isActive: boolean;
        company: string;
        activeDate: Date;
        phoneNumber: string;
    }>;
}
