import { SaleTodoService } from './saleTodo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class SaleTodoController {
    private readonly saleTodoService;
    constructor(saleTodoService: SaleTodoService);
    create(createTodoDto: CreateTodoDto): Promise<{
        id: number;
        name: string | null;
    }>;
    searchTodo(query: string): Promise<string | {
        id: number;
        name: string | null;
    }[]>;
}
