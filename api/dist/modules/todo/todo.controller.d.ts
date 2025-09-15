import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto): Promise<{
        id: number;
        name: string | null;
    }>;
    findAll(dto: FindAllTodoDto): Promise<{
        id: number;
        name: string | null;
    }[]>;
}
