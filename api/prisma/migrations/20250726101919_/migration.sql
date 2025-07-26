-- AlterTable
ALTER TABLE "client" ALTER COLUMN "registerId" DROP NOT NULL,
ALTER COLUMN "modifyId" DROP NOT NULL;

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
    "status" INTEGER DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- CreateIndex
CREATE INDEX "arrived_id" ON "arrived_product"("arrived_id");

-- CreateIndex
CREATE INDEX "product_id" ON "arrived_product"("product_id");

-- CreateIndex
CREATE INDEX "payment_id" ON "paid_suppler"("payment_id");

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_arrived_id_fkey" FOREIGN KEY ("arrived_id") REFERENCES "arrived"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arrived_product" ADD CONSTRAINT "arrived_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
