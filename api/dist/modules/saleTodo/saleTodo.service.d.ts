import { PrismaService } from "../prisma/prisma.service";
import { CreateTodoDto } from "./dto/create-todo.dto";
export declare class SaleTodoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private searchCache;
    onModuleInit(): Promise<void>;
    createTodo(createTodoDto: CreateTodoDto): Promise<{
        id: number;
        name: string | null;
    }>;
    searchTodo(query: string): Promise<string | {
        id: number;
        name: string | null;
    }[]>;
}
