/*
  Warnings:

  - You are about to drop the column `modifyId` on the `arrived_product` table. All the data in the column will be lost.
  - You are about to drop the column `registerId` on the `arrived_product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arrived_product" DROP COLUMN "modifyId",
DROP COLUMN "registerId";
