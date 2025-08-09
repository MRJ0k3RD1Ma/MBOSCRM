import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: {
            id: number;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshUserDto): Promise<{
        accessToken: string;
    }>;
    logout(id: number): Promise<{
        message: string;
    }>;
    findAll(dto: FindAllUserQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            UserRole: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        UserRole: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        id: number;
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
    }>;
}
