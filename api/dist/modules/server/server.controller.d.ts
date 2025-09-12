import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Request } from 'express';
import { FindAllQueryServer } from './dto/findAll-query-server.dto';
export declare class ServerController {
    private readonly serverService;
    constructor(serverService: ServerService);
    create(createServerDto: CreateServerDto, req: Request): Promise<{
        id: number;
        name: string | null;
        responsible: string | null;
        plan: string | null;
        endDate: Date | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.ServerState;
    }>;
    findAll(dto: FindAllQueryServer): Promise<{
        total: any;
        page: number;
        limit: number;
        data: any;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, updateServerDto: UpdateServerDto, req: Request): Promise<{
        id: number;
        name: string | null;
        responsible: string | null;
        plan: string | null;
        endDate: Date | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.ServerState;
    }>;
    remove(id: string): Promise<void>;
}
