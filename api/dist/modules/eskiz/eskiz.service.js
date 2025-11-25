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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EskizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../common/config");
let EskizService = class EskizService {
    constructor(prisma) {
        this.prisma = prisma;
        this.axios = axios_1.default.create({ baseURL: 'https://notify.eskiz.uz/api/' });
    }
    async onModuleInit() {
        await this.getToken();
        this.axios.interceptors.response.use((res) => res, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await this.getToken();
                    return await this.axios(originalRequest);
                }
                catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError);
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        });
    }
    async callback(dto) {
        console.log(dto);
        await this.prisma.detailization.update({
            where: { messageId: dto.message_id },
            data: { state: dto.status },
        });
        return true;
    }
    async sendMessage(message) {
        try {
            const callback_url = `${config_1.env.BACKEND_URL}/eskiz/callback`;
            const { data } = await this.axios.post('message/sms/send', {
                mobile_phone: message.phone_number,
                message: message.message,
                callback_url,
            });
            await this.prisma.detailization.update({
                where: { id: message.id },
                data: { messageId: data.id, state: 'WAITING' },
            });
            return data;
        }
        catch (e) {
            console.log(e);
            await this.prisma.detailization.update({
                where: { id: message.id },
                data: { state: 'REJECTED' },
            });
            throw e;
        }
    }
    async getTemplates() {
        return (await this.axios.get('/user/templates')).data;
    }
    async getToken() {
        try {
            const form = new FormData();
            form.append('email', config_1.env.ESKIZ_EMAIL);
            form.append('password', config_1.env.ESKIZ_PASSWORD);
            const { data } = await this.axios.post('/auth/login', form);
            this.axios.defaults.headers.common['Authorization'] =
                `Bearer ${data.data.token}`;
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.EskizService = EskizService;
exports.EskizService = EskizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EskizService);
//# sourceMappingURL=eskiz.service.js.map