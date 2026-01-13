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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const statistics_service_1 = require("./statistics.service");
const get_outcome_dto_1 = require("./dto/get-outcome.dto");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    findOne(year) {
        return this.statisticsService.getStatistics(year);
    }
    outcome(query) {
        return this.statisticsService.outcome(query);
    }
    exportExcel(year, month) {
        return this.statisticsService.exportAsExcel(year, month);
    }
    exportJson(year, month) {
        return this.statisticsService.exportAsJson(year, month);
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get Statistics', false, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/outcome'),
    (0, decorator_auth_1.DecoratorWrapper)('Get Statistics', false, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_outcome_dto_1.GetOutcomeQueryDto]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "outcome", null);
__decorate([
    (0, common_1.Get)('export/excel'),
    (0, decorator_auth_1.DecoratorWrapper)('Export as Excel', false, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "exportExcel", null);
__decorate([
    (0, common_1.Get)('export/json'),
    (0, decorator_auth_1.DecoratorWrapper)('Export as Json', false, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('month', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "exportJson", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map