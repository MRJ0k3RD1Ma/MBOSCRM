/*
  Warnings:

  - Made the column `client_id` on table `ClientCrm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `ClientCrm` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `clientId` to the `Detailization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Detailization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientCrm" DROP CONSTRAINT "ClientCrm_client_id_fkey";

-- DropForeignKey
ALTER TABLE "ClientCrm" DROP CONSTRAINT "ClientCrm_productId_fkey";

-- DropForeignKey
ALTER TABLE "Detailization" DROP CONSTRAINT "Detailization_accessId_fkey";

-- DropIndex
DROP INDEX "Access_key_key";

-- AlterTable
ALTER TABLE "ClientCrm" ALTER COLUMN "client_id" SET NOT NULL,
ALTER COLUMN "productId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Detailization" ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "phone_number" TEXT NOT NULL,
ALTER COLUMN "accessId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "SaleTodo_name_idx" ON "SaleTodo"("name");

-- AddForeignKey
ALTER TABLE "ClientCrm" ADD CONSTRAINT "ClientCrm_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCrm" ADD CONSTRAINT "ClientCrm_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
