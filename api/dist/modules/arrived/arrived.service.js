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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrivedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const arrived_product_service_1 = require("../arrived-product/arrived-product.service");
const config_1 = require("../../common/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_1 = require("@grammyjs/nestjs");
const grammy_1 = require("grammy");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(timezone_1.default);
let ArrivedService = class ArrivedService {
    constructor(prisma, arrivedProductService, eventEmitter, bot) {
        this.prisma = prisma;
        this.arrivedProductService = arrivedProductService;
        this.eventEmitter = eventEmitter;
        this.bot = bot;
    }
    async recalculate(arrivedId) {
        const arrivedProductAgg = await this.prisma.arrivedProduct.aggregate({
            _sum: { priceCount: true },
            where: { arrivedId, isDeleted: false },
        });
        const arrivedPrice = arrivedProductAgg._sum.priceCount || 0;
        const arrived = await this.prisma.arrived.update({
            where: { id: arrivedId },
            data: { price: arrivedPrice },
        });
        this.eventEmitter.emit('recalculate.supplier', arrived.supplierId);
    }
    async onModuleInit() {
        (async () => {
            const arriveds = await this.prisma.arrived.findMany({
                where: { isDeleted: false },
                select: { id: true },
            });
            for (const arrived of arriveds) {
                await this.recalculate(arrived.id);
            }
        })();
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.arrived.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                const supplier = await this.prisma.supplier.findFirst({
                    where: { isDeleted: false },
                });
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        supplierId: supplier.id,
                        date: new Date(),
                        description: 'description asdfghj',
                        products: [{ count: 1, productId: 1 }],
                    }, 1);
                }
            }
        }
    }
    async sendNotification(arrivedId) {
        const arrived = await this.prisma.arrived.findFirst({
            where: { id: arrivedId, isDeleted: false },
            include: {
                supplier: true,
                ArrivedProduct: { include: { Product: true } },
                register: true,
            },
        });
        if (!arrived)
            return;
        const message = `
Tovar qabul qilish

${arrived.ArrivedProduct.map((v) => `${v.count}x ${v.Product.name}- ${v.priceCount} So'm`).join('\n')}

Yetkazuvchi: ${arrived.supplier.name}

Kiritdi: ${arrived.register.name}

Vaqt: ${(0, dayjs_1.default)(arrived.date).format('DD-MM-YYYY')}
    `;
        const users = await this.prisma.user.findMany({});
        for (const user of users) {
            if (!user.chatId)
                continue;
            try {
                await this.bot.api.sendMessage(user.chatId, message);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    async create(createArrivedDto, creatorId) {
        const { date, waybillNumber, supplierId, description, products } = createArrivedDto;
        const existingSupplier = await this.prisma.supplier.findFirst({
            where: { id: supplierId, isDeleted: false },
        });
        if (!existingSupplier) {
            throw new http_error_1.HttpError({
                message: `Supplier with ID ${supplierId} not found`,
            });
        }
        const maxCode = await this.prisma.arrived.findFirst({
            where: {
                created: {
                    lt: new Date(new Date().getFullYear(), 11),
                    gt: new Date(new Date().getFullYear(), 0),
                },
            },
            orderBy: { codeId: 'desc' },
        });
        const codeId = (maxCode?.codeId || 0) + 1;
        let arrived = await this.prisma.arrived.create({
            data: {
                date,
                code: `${new Date().getFullYear() - 2000}-${codeId}`,
                codeId,
                waybillNumber,
                supplierId,
                description,
                registerId: creatorId,
                modifyId: creatorId,
            },
        });
        let totalPrice = 0;
        for (const product of products) {
            const arrivedProduct = await this.arrivedProductService.create({
                arrivedId: arrived.id,
                count: product.count,
                price: product.price,
                productId: product.productId,
            }, creatorId);
            totalPrice += arrivedProduct.priceCount;
        }
        await this.prisma.supplier.update({
            where: { id: supplierId },
            data: { balance: { decrement: totalPrice } },
        });
        arrived = await this.prisma.arrived.update({
            where: { id: arrived.id },
            data: { price: totalPrice },
            include: { ArrivedProduct: { include: { Product: true } } },
        });
        this.recalculate(arrived.id);
        this.sendNotification(arrived.id);
        return arrived;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, fromDate, toDate, supplierId, code, } = dto;
        const where = {
            isDeleted: false,
        };
        if (supplierId !== undefined) {
            where.supplierId = supplierId;
        }
        if (code) {
            where.code = {
                startsWith: code,
                mode: 'insensitive',
            };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
            };
        }
        if (fromDate || toDate) {
            where.date = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.arrived.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: { ArrivedProduct: { include: { Product: true } }, register: true, supplier: true },
                orderBy: { id: 'desc' },
            }),
            this.prisma.arrived.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: { ArrivedProduct: true, register: true, supplier: true },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        return arrived;
    }
    async update(id, updateArrivedDto, modifyId) {
        const arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        let totalPrice = 0;
        for (let product of updateArrivedDto.products) {
            const currentArrivedProdcut = await this.prisma.arrivedProduct.findFirst({
                where: { arrivedId: arrived.id, productId: product.productId },
            });
            let arrivedProduct;
            if (currentArrivedProdcut) {
                arrivedProduct = await this.arrivedProductService.update(currentArrivedProdcut.id, {
                    count: product.count || currentArrivedProdcut.count,
                    price: product.price || currentArrivedProdcut.price,
                    productId: product.productId || currentArrivedProdcut.productId,
                });
            }
            else {
                arrivedProduct = await this.arrivedProductService.create({
                    count: product.count || currentArrivedProdcut.count,
                    price: product.price || currentArrivedProdcut.price,
                    productId: product.productId || currentArrivedProdcut.productId,
                }, modifyId);
            }
            totalPrice += arrivedProduct.priceCount;
        }
        await this.prisma.arrivedProduct.deleteMany({
            where: {
                arrivedId: arrived.id,
                productId: { notIn: updateArrivedDto.products.map((v) => v.productId) },
            },
        });
        return this.prisma.arrived.update({
            where: { id },
            data: {
                date: updateArrivedDto.date ?? arrived.date,
                waybillNumber: updateArrivedDto.waybillNumber ?? arrived.waybillNumber,
                supplierId: updateArrivedDto.supplierId ?? arrived.supplierId,
                description: updateArrivedDto.description ?? arrived.description,
                price: totalPrice,
            },
            include: {
                ArrivedProduct: { include: { Product: true } },
                modify: true,
                register: true,
                supplier: true,
            },
        });
    }
    async remove(id) {
        let arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        arrived = this.prisma.arrived.update({
            where: { id },
            data: { isDeleted: true },
        });
        this.eventEmitter.emit('recalculate.supplier', arrived.supplierId);
        return arrived;
    }
};
exports.ArrivedService = ArrivedService;
__decorate([
    (0, event_emitter_1.OnEvent)('recalculate.arrived'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArrivedService.prototype, "recalculate", null);
exports.ArrivedService = ArrivedService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, nestjs_1.InjectBot)()),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        arrived_product_service_1.ArrivedProductService,
        event_emitter_1.EventEmitter2,
        grammy_1.Bot])
], ArrivedService);
//# sourceMappingURL=arrived.service.js.map