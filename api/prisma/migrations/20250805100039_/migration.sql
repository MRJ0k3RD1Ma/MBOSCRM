-- DropIndex
DROP INDEX "FK_paid_client_client_id";

-- CreateIndex
CREATE INDEX "FK_paid_client_client_id" ON "Subscribe"("clientId");
