/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `suppler` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "suppler_phone_key" ON "suppler"("phone");
