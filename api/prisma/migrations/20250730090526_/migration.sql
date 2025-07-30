/*
  Warnings:

  - You are about to drop the column `suppler_id` on the `arrived` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "arrived" DROP COLUMN "suppler_id",
ADD COLUMN     "supplier_id" INTEGER;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppler"("id") ON DELETE SET NULL ON UPDATE CASCADE;
