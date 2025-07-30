/*
  Warnings:

  - Made the column `supplier_id` on table `arrived` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "arrived" DROP CONSTRAINT "arrived_supplier_id_fkey";

-- AlterTable
ALTER TABLE "arrived" ALTER COLUMN "supplier_id" SET NOT NULL,
ALTER COLUMN "supplier_id" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
