/*
  Warnings:

  - Added the required column `paymentId` to the `PaidOther` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaidOther" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
