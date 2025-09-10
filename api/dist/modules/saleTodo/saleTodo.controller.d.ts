import { SaleTodoService } from './saleTodo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class SaleTodoController {
    private readonly saleTodoService;
    constructor(saleTodoService: SaleTodoService);
    create(createTodoDto: CreateTodoDto): Promise<{
        name: string | null;
        id: number;
    }>;
    searchTodo(query: string): Promise<string | {
        name: string | null;
        id: number;
    }[]>;
}
