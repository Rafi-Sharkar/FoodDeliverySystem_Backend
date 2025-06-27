/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "operating_hour_start" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "operating_hour_end" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");
