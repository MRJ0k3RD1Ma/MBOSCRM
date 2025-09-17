/*
  Warnings:

  - You are about to drop the column `productId` on the `Access` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Access` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Access` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Access` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Access` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Access" DROP CONSTRAINT "Access_productId_fkey";

-- AlterTable
ALTER TABLE "Access" DROP COLUMN "productId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Access_key_key" ON "Access"("key");
