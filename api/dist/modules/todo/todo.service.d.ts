import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
export declare class TodoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTodoDto: CreateTodoDto): Promise<{
        id: number;
        name: string | null;
    }>;
    findAll(dto: FindAllTodoDto): Promise<{
        id: number;
        name: string | null;
    }[]>;
}
