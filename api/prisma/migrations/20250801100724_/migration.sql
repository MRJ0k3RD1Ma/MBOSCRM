-- CreateTable
CREATE TABLE "SaleProduct" (
    "id" SERIAL NOT NULL,
    "sale_id" INTEGER,
    "product_id" INTEGER,
    "price" DOUBLE PRECISION,
    "count" DOUBLE PRECISION,
    "price_count" DOUBLE PRECISION,
    "is_subscribe" BOOLEAN DEFAULT false,
    "register_id" INTEGER,
    "modify_id" INTEGER,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" INTEGER,

    CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SaleProduct_sale_id_idx" ON "SaleProduct"("sale_id");

-- CreateIndex
CREATE INDEX "SaleProduct_product_id_idx" ON "SaleProduct"("product_id");

-- CreateIndex
CREATE INDEX "SaleProduct_register_id_idx" ON "SaleProduct"("register_id");

-- CreateIndex
CREATE INDEX "SaleProduct_modify_id_idx" ON "SaleProduct"("modify_id");

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
