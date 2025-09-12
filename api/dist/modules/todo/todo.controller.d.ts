import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
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
