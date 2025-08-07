/*
  Warnings:

  - You are about to drop the column `creatorId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `product_group` table. All the data in the column will be lost.
  - Added the required column `registerId` to the `product_group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "product_group" DROP CONSTRAINT "product_group_creatorId_fkey";

-- DropIndex
DROP INDEX "FK_product_creator_id";

-- DropIndex
DROP INDEX "FK_product_type_creator_id";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "clientName" VARCHAR(255);

-- AlterTable
ALTER TABLE "SaleProduct" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "arrived_product" ADD COLUMN     "modifyId" INTEGER,
ADD COLUMN     "registerId" INTEGER;

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "modifyId" INTEGER,
ADD COLUMN     "registerId" INTEGER;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "creatorId",
ADD COLUMN     "registerId" INTEGER;

-- AlterTable
ALTER TABLE "product_group" DROP COLUMN "creatorId",
ADD COLUMN     "registerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product_unit" ADD COLUMN     "modifyId" INTEGER,
ADD COLUMN     "registerId" INTEGER;

-- CreateIndex
CREATE INDEX "FK_product_register_id" ON "product"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_group_register_id" ON "product_group"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_unit_register_id" ON "product_unit"("registerId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_unit" ADD CONSTRAINT "product_unit_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_unit" ADD CONSTRAINT "product_unit_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppler" ADD CONSTRAINT "suppler_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppler" ADD CONSTRAINT "suppler_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOtherGroup" ADD CONSTRAINT "PaidOtherGroup_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOtherGroup" ADD CONSTRAINT "PaidOtherGroup_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "FK_product_type_modify_id" RENAME TO "FK_product_group_modify_id";
