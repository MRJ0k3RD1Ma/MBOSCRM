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
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        registerId: number | null;
        modifyId: number | null;
        isCompleted: boolean;
        feedbackId: number | null;
    }>;
    findAll(dto: FindAllSaleTodoDto): Promise<{
        data: {
            name: string | null;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            saleId: number | null;
            registerId: number | null;
            modifyId: number | null;
            isCompleted: boolean;
            feedbackId: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        registerId: number | null;
        modifyId: number | null;
        isCompleted: boolean;
        feedbackId: number | null;
    }>;
    update(id: number, updateSaleTodoDto: UpdateSaleTodoDto): Promise<{
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        registerId: number | null;
        modifyId: number | null;
        isCompleted: boolean;
        feedbackId: number | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
