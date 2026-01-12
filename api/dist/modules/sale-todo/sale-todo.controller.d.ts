import { SaleTodoService } from './sale-todo.service';
import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { Request } from 'express';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';
export declare class SaleTodoController {
    private readonly saleTodoService;
    constructor(saleTodoService: SaleTodoService);
    create(createSaleTodoDto: CreateSaleTodoDto, req: Request): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateSaleTodoDto: UpdateSaleTodoDto): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
