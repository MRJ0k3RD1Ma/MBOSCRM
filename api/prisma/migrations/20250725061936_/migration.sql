/*
  Warnings:

  - You are about to drop the column `created` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `client_type` table. All the data in the column will be lost.
  - You are about to drop the column `registerId` on the `client_type` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `client_type` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `client_type` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `registerId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `product_group` table. All the data in the column will be lost.
  - You are about to drop the column `registerId` on the `product_group` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `product_group` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `product_group` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `product_unit` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `product_unit` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `product_unit` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user_role` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `client_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `product_group` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "client_type" DROP CONSTRAINT "client_type_registerId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_registerId_fkey";

-- DropForeignKey
ALTER TABLE "product_group" DROP CONSTRAINT "product_group_registerId_fkey";

-- DropIndex
DROP INDEX "FK_client_type_register_id";

-- DropIndex
DROP INDEX "FK_product_register_id";

-- DropIndex
DROP INDEX "FK_product_type_register_id";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "created",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "client_type" DROP COLUMN "created",
DROP COLUMN "registerId",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "created",
DROP COLUMN "registerId",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorId" INTEGER,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product_group" DROP COLUMN "created",
DROP COLUMN "registerId",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "product_unit" DROP COLUMN "created",
DROP COLUMN "status",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "refreshToken",
DROP COLUMN "status",
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_role" DROP COLUMN "status",
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false;

-- CreateIndex
CREATE INDEX "FK_client_type_register_id" ON "client_type"("creatorId");

-- CreateIndex
CREATE INDEX "FK_product_creator_id" ON "product"("creatorId");

-- CreateIndex
CREATE INDEX "FK_product_type_creator_id" ON "product_group"("creatorId");

-- AddForeignKey
ALTER TABLE "client_type" ADD CONSTRAINT "client_type_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_group" ADD CONSTRAINT "product_group_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
