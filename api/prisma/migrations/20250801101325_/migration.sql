/*
  Warnings:

  - You are about to drop the column `modify_id` on the `SaleProduct` table. All the data in the column will be lost.
  - You are about to drop the column `price_count` on the `SaleProduct` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `SaleProduct` table. All the data in the column will be lost.
  - You are about to drop the column `register_id` on the `SaleProduct` table. All the data in the column will be lost.
  - You are about to drop the column `sale_id` on the `SaleProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_sale_id_fkey";

-- DropIndex
DROP INDEX "SaleProduct_modify_id_idx";

-- DropIndex
DROP INDEX "SaleProduct_product_id_idx";

-- DropIndex
DROP INDEX "SaleProduct_register_id_idx";

-- DropIndex
DROP INDEX "SaleProduct_sale_id_idx";

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "modify_id",
DROP COLUMN "price_count",
DROP COLUMN "product_id",
DROP COLUMN "register_id",
DROP COLUMN "sale_id",
ADD COLUMN     "modifyId" INTEGER,
ADD COLUMN     "priceCount" DOUBLE PRECISION,
ADD COLUMN     "productId" INTEGER,
ADD COLUMN     "registerId" INTEGER,
ADD COLUMN     "saleId" INTEGER;

-- CreateIndex
CREATE INDEX "SaleProduct_saleId_idx" ON "SaleProduct"("saleId");

-- CreateIndex
CREATE INDEX "SaleProduct_productId_idx" ON "SaleProduct"("productId");

-- CreateIndex
CREATE INDEX "SaleProduct_registerId_idx" ON "SaleProduct"("registerId");

-- CreateIndex
CREATE INDEX "SaleProduct_modifyId_idx" ON "SaleProduct"("modifyId");

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
