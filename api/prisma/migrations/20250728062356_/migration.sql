/*
  Warnings:

  - You are about to drop the column `status` on the `paid_suppler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "paid_suppler" DROP COLUMN "status",
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;
