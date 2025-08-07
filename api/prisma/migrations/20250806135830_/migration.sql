-- CreateEnum
CREATE TYPE "ServerState" AS ENUM ('RUNNING', 'CLOSED');

-- CreateTable
CREATE TABLE "servers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "price" DOUBLE PRECISION,
    "responsible" VARCHAR(255),
    "plan" VARCHAR(255),
    "endDate" TIMESTAMP(3),
    "isDeleted" BOOLEAN DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "state" "ServerState" NOT NULL DEFAULT 'RUNNING',

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
