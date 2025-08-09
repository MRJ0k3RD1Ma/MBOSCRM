import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FindAllUserRoleQueryDto } from './dto/findAll-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createUserRoleDto: CreateUserRoleDto): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(dto: FindAllUserRoleQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateUserRoleDto): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
