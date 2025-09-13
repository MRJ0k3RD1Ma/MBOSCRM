"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envalid_1 = require("envalid");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)(),
    ENV: (0, envalid_1.str)(),
    ACCESS_TOKEN_SECRET: (0, envalid_1.str)(),
    REFRESH_TOKEN_SECRET: (0, envalid_1.str)(),
    PASSPHRASE: (0, envalid_1.str)(),
    DATABASE_URL: (0, envalid_1.str)(),
    BOT_TOKEN: (0, envalid_1.str)(),
    BACKEND_URL: (0, envalid_1.str)(),
    IS_MAIN: (0, envalid_1.bool)({ default: false }),
    MAIN_BACKEND_URL: (0, envalid_1.str)({
        default: undefined,
        requiredWhen(cleanedEnv) {
            return !cleanedEnv.IS_MAIN;
        },
    }),
    MAIN_KEY: (0, envalid_1.str)({
        default: undefined,
        requiredWhen(cleanedEnv) {
            return !cleanedEnv.IS_MAIN;
        },
    }),
    ESKIZ_EMAIL: (0, envalid_1.str)({
        default: undefined,
        requiredWhen(cleanedEnv) {
            return !!cleanedEnv.IS_MAIN;
        },
    }),
    ESKIZ_PASSWORD: (0, envalid_1.str)({
        default: undefined,
        requiredWhen(cleanedEnv) {
            return !!cleanedEnv.IS_MAIN;
        },
    }),
});
//# sourceMappingURL=index.js.map