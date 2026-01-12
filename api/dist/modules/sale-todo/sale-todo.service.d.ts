import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';
import { TodoService } from '../todo/todo.service';
export declare class SaleTodoService {
    private readonly prisma;
    private readonly todo;
    constructor(prisma: PrismaService, todo: TodoService);
    create(createSaleTodoDto: CreateSaleTodoDto, user: number): Promise<{
        id: number;
        name: string | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllSaleTodoDto): Promise<{
        data: {
            id: number;
            name: string | null;
            saleId: number | null;
            feedbackId: number | null;
            isCompleted: boolean;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        id: number;
        name: string | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, updateSaleTodoDto: UpdateSaleTodoDto): Promise<{
        id: number;
        name: string | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
