import { ClientTypeService } from './clientType.service';
import { CreateClientTypeDto } from './dto/create-client-type.dto';
import { FindAllClientTypeQueryDto } from './dto/findAll-client-type.dto';
import { UpdateClientTypeDto } from './dto/update-client-type.dto';
export declare class ClientTypeController {
    private readonly clientTypeService;
    constructor(clientTypeService: ClientTypeService);
    create(createClientTypeDto: CreateClientTypeDto): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    findAll(query: FindAllClientTypeQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            modifyId: number | null;
            creatorId: number | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    update(id: string, updateClientTypeDto: UpdateClientTypeDto): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
}
