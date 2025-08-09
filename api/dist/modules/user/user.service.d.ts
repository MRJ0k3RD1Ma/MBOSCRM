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
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(dto: LoginUserDto): Promise<{
        user: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        data: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        roleId: number | null;
        chatId: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
