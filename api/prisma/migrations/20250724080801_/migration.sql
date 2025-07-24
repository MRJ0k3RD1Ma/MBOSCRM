/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscriptionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SERVICE', 'DEVICE', 'SUBSCRIPTION');

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_subscriptionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "SubscriptionType";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "PaymentType";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "inn" VARCHAR(255) NOT NULL,
    "regionId" INTEGER,
    "districtId" INTEGER,
    "address" VARCHAR(255),
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "registerId" INTEGER NOT NULL,
    "modifyId" INTEGER NOT NULL,
    "status" INTEGER,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR(255),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "registerId" INTEGER NOT NULL,
    "modifyId" INTEGER NOT NULL,
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "district" (
    "id" SERIAL NOT NULL,
    "regionId" INTEGER,
    "name" VARCHAR(255),

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(255),
    "barcodeId" INTEGER,
    "groupId" INTEGER NOT NULL,
    "unitId" INTEGER,
    "priceIncome" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reminderFirst" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "type" "ProductType" NOT NULL,
    "countReminder" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "countArrived" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "countSale" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER NOT NULL,
    "modifyId" INTEGER NOT NULL,

    CONSTRAINT "product_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(500),
    "phone" VARCHAR(255),
    "refreshToken" VARCHAR(255),
    "roleId" INTEGER,
    "status" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FK_client_district_id" ON "client"("districtId");

-- CreateIndex
CREATE INDEX "FK_client_modify_id" ON "client"("modifyId");

-- CreateIndex
CREATE INDEX "FK_client_region_id" ON "client"("regionId");

-- CreateIndex
CREATE INDEX "FK_client_register_id" ON "client"("registerId");

-- CreateIndex
CREATE INDEX "FK_client_type_id" ON "client"("typeId");

-- CreateIndex
CREATE INDEX "FK_client_type_modify_id" ON "client_type"("modifyId");

-- CreateIndex
CREATE INDEX "FK_client_type_register_id" ON "client_type"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_group_id" ON "product"("groupId");

-- CreateIndex
CREATE INDEX "FK_product_modify_id" ON "product"("modifyId");

-- CreateIndex
CREATE INDEX "FK_product_register_id" ON "product"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_unit_id" ON "product"("unitId");

-- CreateIndex
CREATE INDEX "FK_product_type_modify_id" ON "product_group"("modifyId");

-- CreateIndex
CREATE INDEX "FK_product_type_register_id" ON "product_group"("registerId");

-- CreateIndex
CREATE INDEX "FK_user_role_id" ON "user"("roleId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "client_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "product_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "product_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
