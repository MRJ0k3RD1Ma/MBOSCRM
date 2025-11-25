"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const create_todo_dto_1 = require("./dto/create-todo.dto");
const finAll_todo_dto_1 = require("./dto/finAll-todo.dto");
const decorator_auth_1 = require("src/common/auth/decorator.auth");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    create(createTodoDto) {
        return this.todoService.create(createTodoDto);
    }
    findAll(dto) {
        return this.todoService.findAll(dto);
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createTodo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_todo_dto_1.CreateTodoDto]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('getTodos'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [finAll_todo_dto_1.FindAllTodoDto]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "findAll", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map