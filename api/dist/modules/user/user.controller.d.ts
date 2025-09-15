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
        phone: string | null;
        username: string;
        roleId: number | null;
        chatId: string | null;
        password: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        phone: string | null;
        username: string;
        roleId: number | null;
        chatId: string | null;
        password: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        phone: string | null;
        username: string;
        roleId: number | null;
        chatId: string | null;
        password: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        phone: string | null;
        username: string;
        roleId: number | null;
        chatId: string | null;
        password: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
