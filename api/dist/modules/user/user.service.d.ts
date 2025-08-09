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
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
                name: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: number): Promise<{
        UserRole: {
            name: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
