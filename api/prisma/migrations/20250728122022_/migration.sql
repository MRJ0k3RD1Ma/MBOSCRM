/*
  Warnings:

  - You are about to drop the column `created` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payment" DROP COLUMN "created",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
