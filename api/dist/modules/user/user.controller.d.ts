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
        name: string;
        username: string;
        password: string;
        phone: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
        id: number;
        roleId: number | null;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
            id: number;
            roleId: number | null;
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
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
            id: number;
            roleId: number | null;
        })[];
    }>;
    findMe(req: Request): Promise<{
        success: boolean;
    }>;
    findOne(id: string): Promise<{
        UserRole: {
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    } & {
        name: string;
        username: string;
        password: string;
        phone: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
        id: number;
        roleId: number | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
        id: number;
        roleId: number | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        username: string;
        password: string;
        phone: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        chatId: string | null;
        id: number;
        roleId: number | null;
    }>;
}
