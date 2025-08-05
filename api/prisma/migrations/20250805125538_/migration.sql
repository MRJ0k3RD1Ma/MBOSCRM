-- CreateEnum
CREATE TYPE "PaidOtherType" AS ENUM ('INCOME', 'OUTCOME');

-- CreateTable
CREATE TABLE "PaidOther" (
    "id" SERIAL NOT NULL,
    "type" "PaidOtherType" NOT NULL,
    "groupId" INTEGER NOT NULL,
    "description" TEXT,
    "paidDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "PaidOther_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidOtherGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "PaidOtherGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PaidOtherGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
