import { bool, cleanEnv, num, str } from 'envalid';
import { config } from 'dotenv';
config();

export const env = cleanEnv(process.env, {
  PORT: num(),
  ENV: str(),

  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  PASSPHRASE: str(),

  DATABASE_URL: str(),

  BOT_TOKEN: str(),
  BACKEND_URL: str(),

  IS_MAIN: bool({ default: false }),
  MAIN_BACKEND_URL: str({
    default: undefined,
    requiredWhen(cleanedEnv) {
      return !cleanedEnv.IS_MAIN;
    },
  }),
  MAIN_KEY: str(),

  ESKIZ_EMAIL: str({
    default: undefined,
    requiredWhen(cleanedEnv) {
      return !!cleanedEnv.IS_MAIN;
    },
  }),
  ESKIZ_PASSWORD: str({
    default: undefined,
    requiredWhen(cleanedEnv) {
      return !!cleanedEnv.IS_MAIN;
    },
  }),
});
