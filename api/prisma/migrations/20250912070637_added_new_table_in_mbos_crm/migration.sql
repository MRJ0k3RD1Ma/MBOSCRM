-- CreateEnum
CREATE TYPE "AppealState" AS ENUM ('NEW', 'RUNNING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SaleFeedbackState" AS ENUM ('TODO', 'RUNNING', 'WAITING', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SaleFeedbackResult" AS ENUM ('NOT_COMPLETED', 'PART_COMPLETED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DetailizationState" AS ENUM ('NEW', 'WAITING', 'REJECTED', 'DELIVRD');

-- AlterTable
ALTER TABLE "setting" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creditReminderInterval" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "smsExpiredHour" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "smsPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Appeal" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "detail" TEXT NOT NULL,
    "state" "AppealState" NOT NULL DEFAULT 'NEW',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifyId" INTEGER,

    CONSTRAINT "Appeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleFeedback" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "alias" VARCHAR(255) NOT NULL DEFAULT '',
    "name" VARCHAR(255),
    "description" TEXT,
    "score" INTEGER,
    "state" "SaleFeedbackState" NOT NULL DEFAULT 'TODO',
    "result" "SaleFeedbackResult",

    CONSTRAINT "SaleFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleTodo" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER,
    "feedbackId" INTEGER,
    "name" VARCHAR(255),
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "SaleTodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "key" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientCrm" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER DEFAULT 1,
    "productId" INTEGER,
    "domain" TEXT,
    "isFullAccess" BOOLEAN NOT NULL DEFAULT false,
    "expiredFullAccess" TIMESTAMP(3),
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "key" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientCrm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detailization" (
    "id" SERIAL NOT NULL,
    "accessId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "messageId" VARCHAR(255),
    "state" "DetailizationState",
    "count" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "crmId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Detailization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidCrm" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paidDate" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,
    "state" VARCHAR(255),
    "crmId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaidCrm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Access_key_key" ON "Access"("key");

-- AddForeignKey
ALTER TABLE "Appeal" ADD CONSTRAINT "Appeal_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SaleFeedback" ADD CONSTRAINT "SaleFeedback_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTodo" ADD CONSTRAINT "SaleTodo_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTodo" ADD CONSTRAINT "SaleTodo_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "SaleFeedback"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTodo" ADD CONSTRAINT "SaleTodo_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SaleTodo" ADD CONSTRAINT "SaleTodo_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Access" ADD CONSTRAINT "Access_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCrm" ADD CONSTRAINT "ClientCrm_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientCrm" ADD CONSTRAINT "ClientCrm_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detailization" ADD CONSTRAINT "Detailization_crmId_fkey" FOREIGN KEY ("crmId") REFERENCES "ClientCrm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidCrm" ADD CONSTRAINT "PaidCrm_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidCrm" ADD CONSTRAINT "PaidCrm_crmId_fkey" FOREIGN KEY ("crmId") REFERENCES "ClientCrm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidCrm" ADD CONSTRAINT "PaidCrm_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
