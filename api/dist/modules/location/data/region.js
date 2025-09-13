"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const region_json_1 = __importDefault(require("./region.json"));
async function main(prisma) {
    for (const region of region_json_1.default) {
        await prisma.region.upsert({
            where: { id: region.id },
            update: {},
            create: {
                id: region.id,
                name: region.title,
            },
        });
        console.log(`Region ${region.title} qo'shildi`);
    }
    console.log('All regions have been seeded successfully.');
}
//# sourceMappingURL=region.js.map