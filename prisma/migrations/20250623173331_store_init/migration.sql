-- CreateEnum
CREATE TYPE "InventoryCategory" AS ENUM ('Inventory_contable', 'Inventory_not_countable');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('percentage', 'flat');

-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('resturant', 'shop', 'grocery');

-- CreateEnum
CREATE TYPE "ResturantStatus" AS ENUM ('is_active', 'inactive', 'suspended', 'deal_closed');

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "bussiness_owner_id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "phone_no" TEXT NOT NULL,
    "contact_person_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inventory_category" "InventoryCategory" NOT NULL,
    "commission_type" "CommissionType" NOT NULL,
    "commission_amount" DOUBLE PRECISION NOT NULL,
    "store_type" "StoreType" NOT NULL,
    "min_order_amount" INTEGER NOT NULL,
    "store_category" TEXT[],
    "open_for_order" BOOLEAN NOT NULL,
    "franchise_id" TEXT,
    "hubs_list" TEXT[],
    "is_vat_included" BOOLEAN NOT NULL,
    "active_coupon" TEXT,
    "store_settings" TEXT,
    "operating_hour_start" TIMESTAMP(3) NOT NULL,
    "operating_hour_end" TIMESTAMP(3) NOT NULL,
    "meta" JSONB,
    "key_words" TEXT,
    "resturant_status" "ResturantStatus" NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_settings_key" ON "Store"("store_settings");
