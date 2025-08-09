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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ServerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const schedule_1 = require("@nestjs/schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const nestjs_1 = require("@grammyjs/nestjs");
const grammy_1 = require("grammy");
let ServerService = ServerService_1 = class ServerService {
    constructor(prisma, bot) {
        this.prisma = prisma;
        this.bot = bot;
        this.logger = new common_1.Logger(ServerService_1.name);
    }
    async handleExpiredServers() {
        this.logger.log('Checking expired servers...');
        const now = new Date();
        const sevenDaysLeftServers = await this.prisma.server.findMany({
            where: {
                endDate: {
                    lt: (0, dayjs_1.default)(now).add(7, 'days').toDate(),
                },
                state: {
                    not: client_1.ServerState.CLOSED,
                },
            },
        });
        if (sevenDaysLeftServers?.length > 0) {
            for (const server of sevenDaysLeftServers) {
                const leftDays = (0, dayjs_1.default)(server.endDate).diff(now, 'days');
                const users = [];
                users.push(...(await this.prisma.user.findMany({
                    where: { UserRole: { name: 'superadmin' } },
                })));
                if (leftDays < 4) {
                    users.push(...(await this.prisma.user.findMany({
                        where: { UserRole: { name: 'admin' } },
                    })));
                }
                for (const user of users) {
                    if (!user.chatId)
                        continue;
                    try {
                        await this.bot.api.sendMessage(user.chatId, `${server.name} serveri yopilishiga ${Math.abs((0, dayjs_1.default)(now).diff(server.endDate, 'days'))} kun qoldi`);
                    }
                    catch { }
                }
            }
        }
        const expiredServers = await this.prisma.server.findMany({
            where: {
                endDate: {
                    lt: now,
                },
                state: {
                    not: client_1.ServerState.CLOSED,
                },
            },
        });
        this.logger.log(`Found ${expiredServers.length} expired servers`);
        for (const server of expiredServers) {
            await this.prisma.server.update({
                where: { id: server.id },
                data: { state: client_1.ServerState.CLOSED },
            });
        }
        this.logger.log('Expired server statuses updated.');
    }
    async create(createServerDto, modifyId) {
        const server = await this.prisma.server.create({
            data: {
                name: createServerDto.name,
                responsible: createServerDto.responsible,
                plan: createServerDto.plan,
                endDate: createServerDto.endDate,
                modifyId: modifyId,
                registerId: modifyId,
            },
        });
        return server;
    }
    async findAll(dto) {
        const { page = 1, limit = 10, name, responsible, plan } = dto;
        const where = { isDeleted: false };
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }
        if (responsible) {
            where.responsible = {
                contains: responsible,
                mode: 'insensitive',
            };
        }
        if (plan) {
            where.plan = plan;
        }
        let [data, total] = await this.prisma.$transaction([
            this.prisma.server.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    paidServers: true,
                },
                orderBy: {
                    endDate: 'desc',
                },
            }),
            this.prisma.server.count({ where }),
        ]);
        data = data.map((server) => {
            server.daysLeft = (0, dayjs_1.default)(server.endDate).diff(new Date(), 'day');
            return server;
        });
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const server = await this.prisma.server.findFirst({
            where: { id, isDeleted: false },
        });
        if (!server) {
            throw new Error(`Server with ID ${id} not found`);
        }
        server.daysLeft = (0, dayjs_1.default)(server.endDate).diff(new Date(), 'days');
        return server;
    }
    async update(id, updateServerDto, modifyId) {
        const server = await this.prisma.server.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!server) {
            throw new Error(`Server with ID ${id} not found`);
        }
        return this.prisma.server.update({
            where: { id },
            data: {
                name: updateServerDto.name ?? server.name,
                responsible: updateServerDto.responsible ?? server.responsible,
                plan: updateServerDto.plan ?? server.plan,
                endDate: updateServerDto.endDate ?? server.endDate,
                modifyId,
            },
        });
    }
    async remove(id) {
        const server = await this.prisma.server.findFirst({
            where: { id, isDeleted: false },
        });
        if (!server) {
            throw new Error(`Server with ID ${id} not found`);
        }
        await this.prisma.server.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.ServerService = ServerService;
__decorate([
    (0, schedule_1.Cron)('* * 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServerService.prototype, "handleExpiredServers", null);
exports.ServerService = ServerService = ServerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectBot)()),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        grammy_1.Bot])
], ServerService);
//# sourceMappingURL=server.service.js.map