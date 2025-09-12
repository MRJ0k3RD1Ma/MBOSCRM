import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
export declare class TodoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTodoDto: CreateTodoDto): Promise<{
        name: string | null;
        id: number;
    }>;
    findAll(dto: FindAllTodoDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string | null;
            id: number;
        }[];
    }>;
}
