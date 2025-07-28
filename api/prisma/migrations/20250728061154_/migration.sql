-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SERVICE', 'DEVICE', 'SUBSCRIPTION');

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
    "phone" VARCHAR(255),

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
    "creatorId" INTEGER,
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
    "creatorId" INTEGER NOT NULL,
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
    "suppler_id" INTEGER NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" INTEGER DEFAULT 1,
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
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "arrived_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paid_suppler" (
    "id" SERIAL NOT NULL,
    "suppler_id" INTEGER,
    "paid_date" TIMESTAMP(3),
    "price" DOUBLE PRECISION,
    "payment_id" INTEGER,
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "icon" VARCHAR(255),
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "client_phone_key" ON "client"("phone");

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
CREATE INDEX "FK_product_creator_id" ON "product"("creatorId");

-- CreateIndex
CREATE INDEX "FK_product_unit_id" ON "product"("unitId");

-- CreateIndex
CREATE INDEX "FK_product_type_modify_id" ON "product_group"("modifyId");

-- CreateIndex
CREATE INDEX "FK_product_type_creator_id" ON "product_group"("creatorId");

-- CreateIndex
CREATE INDEX "FK_user_role_id" ON "user"("roleId");

-- CreateIndex
CREATE INDEX "arrived_id" ON "arrived_product"("arrived_id");

-- CreateIndex
CREATE INDEX "product_id" ON "arrived_product"("product_id");

-- CreateIndex
CREATE INDEX "payment_id" ON "paid_suppler"("payment_id");

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
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "product_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "product_unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_modifyId_fkey" FOREIGN KEY ("modifyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_arrived_id_fkey" FOREIGN KEY ("arrived_id") REFERENCES "arrived"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
