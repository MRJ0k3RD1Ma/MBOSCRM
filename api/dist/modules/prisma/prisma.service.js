"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pg_listen_1 = __importDefault(require("pg-listen"));
const config_1 = require("../../common/config");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        this.subscriber = (0, pg_listen_1.default)({ connectionString: config_1.env.DATABASE_URL });
        await this.$connect();
        await this.subscriber.connect();
        await this.$executeRawUnsafe(`
  CREATE OR REPLACE FUNCTION notify_access_update()
  RETURNS trigger AS $$
  BEGIN
    PERFORM pg_notify('Access', row_to_json(NEW)::text);
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`);
        await this.$executeRawUnsafe(`
  DROP TRIGGER IF EXISTS access_update_trigger ON "Access";
`);
        await this.$executeRawUnsafe(`
  CREATE TRIGGER access_update_trigger
  AFTER UPDATE ON "Access"
  FOR EACH ROW
  EXECUTE FUNCTION notify_access_update();
`);
    }
    async onModuleDestroy() {
        await this.$disconnect();
        await this.subscriber.close();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map