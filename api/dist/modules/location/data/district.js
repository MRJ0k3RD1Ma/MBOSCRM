"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const district_json_1 = __importDefault(require("./district.json"));
async function main(prisma) {
    for (const district of district_json_1.default) {
        await prisma.district.upsert({
            where: { id: district.id },
            update: {},
            create: {
                id: district.id,
                name: district.title,
                regionId: district.region_id,
            },
        });
        console.log(`District ${district.title} qo'shildi.`);
    }
    console.log("Barcha Tumanlar muvaffaqiyatli qo'shildi");
}
//# sourceMappingURL=district.js.map