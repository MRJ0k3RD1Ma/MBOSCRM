/*
  Warnings:

  - You are about to drop the column `userId` on the `SaleProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_userId_fkey";

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "userId";
