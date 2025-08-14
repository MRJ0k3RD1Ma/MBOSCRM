import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryServer } from './dto/findAll-query-server.dto';
import { Bot, Context } from 'grammy';
export declare class ServerService {
    private readonly prisma;
    private readonly bot;
    private readonly logger;
    constructor(prisma: PrismaService, bot: Bot<Context>);
    handleExpiredServers(): Promise<void>;
    create(createServerDto: CreateServerDto, modifyId: number): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.ServerState;
        endDate: Date | null;
        responsible: string | null;
        plan: string | null;
    }>;
    findAll(dto: FindAllQueryServer): Promise<{
        total: any;
        page: number;
        limit: number;
        data: any;
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateServerDto: UpdateServerDto, modifyId: number): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.ServerState;
        endDate: Date | null;
        responsible: string | null;
        plan: string | null;
    }>;
    remove(id: number): Promise<void>;
}
