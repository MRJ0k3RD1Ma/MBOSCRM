import { CreateSaleTodoDto } from './create-sale-todo.dto';
declare const UpdateSaleTodoDto_base: import("@nestjs/common").Type<Partial<CreateSaleTodoDto>>;
export declare class UpdateSaleTodoDto extends UpdateSaleTodoDto_base {
    isCompleted?: boolean;
}
export {};
