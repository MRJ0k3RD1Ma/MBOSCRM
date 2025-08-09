import { UserService } from './user.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    login(loginUserDto: LoginUserDto): Promise<{
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
    refresh(refreshUserDto: RefreshUserDto): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    findAll(query: FindAllUserQueryDto): Promise<{
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
    findMe(req: Request): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<{
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    remove(id: string): Promise<{
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
