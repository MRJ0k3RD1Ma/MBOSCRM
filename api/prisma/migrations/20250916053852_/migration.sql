/*
  Warnings:

  - A unique constraint covering the columns `[saleId]` on the table `SaleFeedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SaleFeedback_saleId_key" ON "SaleFeedback"("saleId");
