/*
  Warnings:

  - You are about to drop the column `created` on the `arrived_product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `arrived_product` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `arrived_product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arrived_product" DROP COLUMN "created",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
