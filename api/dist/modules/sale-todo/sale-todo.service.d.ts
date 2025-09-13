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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
    }>;
    findAll(dto: FindAllSaleTodoDto): Promise<{
        data: {
            name: string | null;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            saleId: number | null;
            feedbackId: number | null;
            isCompleted: boolean;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
    }>;
    update(id: number, updateSaleTodoDto: UpdateSaleTodoDto): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        feedbackId: number | null;
        isCompleted: boolean;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
