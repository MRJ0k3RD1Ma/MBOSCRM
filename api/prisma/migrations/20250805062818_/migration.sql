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

-- CreateIndex
CREATE INDEX "FK_paid_client_client_id" ON "PaidClient"("client_id");

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PaidClient" ADD CONSTRAINT "PaidClient_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
