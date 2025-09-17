import { SaleTodoService } from './sale-todo.service';
import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { Request } from 'express';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';
export declare class SaleTodoController {
    private readonly saleTodoService;
    constructor(saleTodoService: SaleTodoService);
    create(createSaleTodoDto: CreateSaleTodoDto, req: Request): Promise<{
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
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
            registerId: number | null;
            modifyId: number | null;
            saleId: number | null;
            isCompleted: boolean;
            feedbackId: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        isCompleted: boolean;
        feedbackId: number | null;
    }>;
    update(id: string, updateSaleTodoDto: UpdateSaleTodoDto): Promise<{
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        isCompleted: boolean;
        feedbackId: number | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
