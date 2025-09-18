-- DropForeignKey
ALTER TABLE "Detailization" DROP CONSTRAINT "Detailization_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Detailization" DROP CONSTRAINT "Detailization_crmId_fkey";

-- AlterTable
ALTER TABLE "Detailization" ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "crmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_crmId_fkey" FOREIGN KEY ("crmId") REFERENCES "ClientCrm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
