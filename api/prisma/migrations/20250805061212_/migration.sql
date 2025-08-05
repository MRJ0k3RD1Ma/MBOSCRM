/*
  Warnings:
    
  - You are about to drop the column `client_id` on the `Subscribe` table. All the data in the column will be lost.
  - You are about to drop the column `sale_id` on the `Subscribe` table. All the data in the column will be lost.
   
*/
-- DropForeignKey
ALTER TABLE "Subscribe" DROP CONSTRAINT "Subscribe_saleId_fkey";

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "subscribe_begin_date" DROP NOT NULL,
ALTER COLUMN "subscribe_generate_day" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subscribe" DROP COLUMN "client_id",
DROP COLUMN "sale_id",
ALTER COLUMN "saleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
