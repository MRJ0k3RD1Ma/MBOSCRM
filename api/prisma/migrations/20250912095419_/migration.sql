/*
  Warnings:

  - You are about to drop the column `creartedAt` on the `SaleFeedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SaleFeedback" DROP COLUMN "creartedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
