-- This is an empty migration.
CREATE UNIQUE INDEX "phone" ON "client" ("phone") WHERE "isDeleted" IS true;
