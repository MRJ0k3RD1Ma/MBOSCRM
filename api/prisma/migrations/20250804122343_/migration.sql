/*
  Warnings:

  - Added the required column `subscribe_begin_date` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscribe_generate_day` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscribeState" AS ENUM ('NOTPAYING', 'PAID');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "subscribe_begin_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subscribe_generate_day" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Subscribe" (
    "id" SERIAL NOT NULL,
    "sale_id" INTEGER,
    "client_id" INTEGER NOT NULL,
    "paying_date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paid" DOUBLE PRECISION NOT NULL,
    "state" "SubscribeState" NOT NULL DEFAULT 'NOTPAYING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "saleId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
