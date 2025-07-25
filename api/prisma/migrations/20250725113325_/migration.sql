/*
  Warnings:

  - Made the column `isDeleted` on table `client_type` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "client_type" ALTER COLUMN "modifyId" DROP NOT NULL,
ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "isDeleted" SET NOT NULL;
