/*
  Warnings:

  - You are about to drop the column `status` on the `arrived` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arrived" DROP COLUMN "status",
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;
