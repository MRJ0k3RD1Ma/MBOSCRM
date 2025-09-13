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
const saleTodo_service_1 = require("./saleTodo.service");
const saleTodo_controller_1 = require("./saleTodo.controller");
let SaleTodoModule = class SaleTodoModule {
};
exports.SaleTodoModule = SaleTodoModule;
exports.SaleTodoModule = SaleTodoModule = __decorate([
    (0, common_1.Module)({
        controllers: [saleTodo_controller_1.SaleTodoController],
        providers: [saleTodo_service_1.SaleTodoService],
    })
], SaleTodoModule);
//# sourceMappingURL=saleTodo.module.js.map