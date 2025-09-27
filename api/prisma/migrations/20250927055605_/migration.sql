-- CreateTable
CREATE TABLE "SimCard" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "activeDate" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SimCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SimCard" ADD CONSTRAINT "SimCard_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
