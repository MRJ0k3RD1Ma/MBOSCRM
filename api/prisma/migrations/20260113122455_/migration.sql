-- AddForeignKey
ALTER TABLE "paid_suppler" ADD CONSTRAINT "paid_suppler_suppler_id_fkey" FOREIGN KEY ("suppler_id") REFERENCES "suppler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
