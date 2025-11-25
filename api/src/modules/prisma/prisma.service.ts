import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import createSubscriber from "pg-listen";
import { env } from "../../common/config/";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	public subscriber: ReturnType<typeof createSubscriber>;

	async onModuleInit() {
		this.subscriber = createSubscriber({ connectionString: env.DATABASE_URL });
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
}
