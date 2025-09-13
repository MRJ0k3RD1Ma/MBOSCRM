"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleTodoModule = void 0;
const common_1 = require("@nestjs/common");
const sale_todo_service_1 = require("./sale-todo.service");
const sale_todo_controller_1 = require("./sale-todo.controller");
const todo_service_1 = require("../todo/todo.service");
let SaleTodoModule = class SaleTodoModule {
};
exports.SaleTodoModule = SaleTodoModule;
exports.SaleTodoModule = SaleTodoModule = __decorate([
    (0, common_1.Module)({
        controllers: [sale_todo_controller_1.SaleTodoController],
        providers: [sale_todo_service_1.SaleTodoService, todo_service_1.TodoService],
    })
], SaleTodoModule);
//# sourceMappingURL=sale-todo.module.js.map