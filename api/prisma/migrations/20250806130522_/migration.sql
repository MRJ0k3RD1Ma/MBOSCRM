-- CreateTable
CREATE TABLE "PaidServer" (
    "id" SERIAL NOT NULL,
    "serverId" INTEGER NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "paymentTypeId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "PaidServer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
