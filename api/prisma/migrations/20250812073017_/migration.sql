-- CreateEnum
CREATE TYPE "ServerState" AS ENUM ('RUNNING', 'CLOSED');

-- CreateEnum
CREATE TYPE "PaidOtherType" AS ENUM ('INCOME', 'OUTCOME');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SERVICE', 'DEVICE', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "SubscribeState" AS ENUM ('NOTPAYING', 'PAID');

-- CreateEnum
CREATE TYPE "SaleState" AS ENUM ('RUNNING', 'CLOSED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER,
    "name" VARCHAR(255) NOT NULL,
    "inn" VARCHAR(255) NOT NULL,
    "regionId" INTEGER,
    "districtId" INTEGER,
    "address" VARCHAR(255),
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" VARCHAR(255) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" INTEGER,
    "modifyId" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER NOT NULL,
    "modifyId" INTEGER NOT NULL,

    CONSTRAINT "product_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

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
    "password" VARCHAR(500) NOT NULL,
    "phone" VARCHAR(255),
    "roleId" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arrived" (
    "id" SERIAL NOT NULL,
    "date" DATE,
    "code" VARCHAR(255),
    "codeId" INTEGER DEFAULT 1,
    "waybill_number" VARCHAR(255),
    "supplier_id" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "arrived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arrived_product" (
    "id" SERIAL NOT NULL,
    "arrived_id" INTEGER,
    "product_id" INTEGER,
    "count" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION,
    "price_count" DOUBLE PRECISION,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "arrived_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paid_suppler" (
    "id" SERIAL NOT NULL,
    "suppler_id" INTEGER,
    "paid_date" TIMESTAMP(3),
    "price" DOUBLE PRECISION,
    "payment_id" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "paid_suppler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppler" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "phone_two" VARCHAR(255),
    "description" TEXT,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "suppler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "date" DATE,
    "code" VARCHAR(255),
    "codeId" INTEGER DEFAULT 1,
    "client_id" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dept" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "state" "SaleState" NOT NULL DEFAULT 'CLOSED',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "clientName" VARCHAR(255),
    "subscribe_begin_date" TIMESTAMP(3),
    "subscribe_generate_day" INTEGER,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleProduct" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER,
    "productId" INTEGER,
    "price" DOUBLE PRECISION,
    "count" DOUBLE PRECISION,
    "priceCount" DOUBLE PRECISION,
    "is_subscribe" BOOLEAN DEFAULT false,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidClient" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER,
    "sale_id" INTEGER,
    "payment_id" INTEGER,
    "paid_date" DATE,
    "price" DOUBLE PRECISION,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "PaidClient_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "servers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "responsible" VARCHAR(255),
    "plan" VARCHAR(255),
    "endDate" TIMESTAMP(3),
    "isDeleted" BOOLEAN DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "state" "ServerState" NOT NULL DEFAULT 'RUNNING',

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscribe" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER,
    "clientId" INTEGER NOT NULL,
    "paying_date" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paid" DOUBLE PRECISION NOT NULL,
    "state" "SubscribeState" NOT NULL DEFAULT 'NOTPAYING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscribe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "icon" VARCHAR(255),
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaidOther" (
    "id" SERIAL NOT NULL,
    "type" "PaidOtherType" NOT NULL,
    "groupId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "paidDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registerId" INTEGER,
    "modifyId" INTEGER,
    "paymentId" INTEGER NOT NULL,

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

-- CreateTable
CREATE TABLE "user_role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,
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
CREATE INDEX "FK_client_type_register_id" ON "client_type"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "product_barcodeId_key" ON "product"("barcodeId");

-- CreateIndex
CREATE INDEX "FK_product_group_id" ON "product"("groupId");

-- CreateIndex
CREATE INDEX "FK_product_modify_id" ON "product"("modifyId");

-- CreateIndex
CREATE INDEX "FK_product_register_id" ON "product"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_unit_id" ON "product"("unitId");

-- CreateIndex
CREATE INDEX "FK_product_group_modify_id" ON "product_group"("modifyId");

-- CreateIndex
CREATE INDEX "FK_product_group_register_id" ON "product_group"("registerId");

-- CreateIndex
CREATE INDEX "FK_product_unit_register_id" ON "product_unit"("registerId");

-- CreateIndex
CREATE INDEX "FK_user_role_id" ON "user"("roleId");

-- CreateIndex
CREATE INDEX "arrived_id" ON "arrived_product"("arrived_id");

-- CreateIndex
CREATE INDEX "product_id" ON "arrived_product"("product_id");

-- CreateIndex
CREATE INDEX "payment_id" ON "paid_suppler"("payment_id");

-- CreateIndex
CREATE INDEX "SaleProduct_saleId_idx" ON "SaleProduct"("saleId");

-- CreateIndex
CREATE INDEX "SaleProduct_productId_idx" ON "SaleProduct"("productId");

-- CreateIndex
CREATE INDEX "SaleProduct_registerId_idx" ON "SaleProduct"("registerId");

-- CreateIndex
CREATE INDEX "SaleProduct_modifyId_idx" ON "SaleProduct"("modifyId");

-- CreateIndex
CREATE INDEX "FK_paid_client_client_id" ON "Subscribe"("clientId");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "client_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ALTER TABLE "product_unit" ADD CONSTRAINT "product_unit_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_unit" ADD CONSTRAINT "product_unit_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived" ADD CONSTRAINT "arrived_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_arrived_id_fkey" FOREIGN KEY ("arrived_id") REFERENCES "arrived"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suppler" ADD CONSTRAINT "suppler_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppler" ADD CONSTRAINT "suppler_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "servers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidServer" ADD CONSTRAINT "PaidServer_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscribe" ADD CONSTRAINT "Subscribe_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "PaidOtherGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOther" ADD CONSTRAINT "PaidOther_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOtherGroup" ADD CONSTRAINT "PaidOtherGroup_registerId_fkey" FOREIGN KEY ("registerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidOtherGroup" ADD CONSTRAINT "PaidOtherGroup_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
