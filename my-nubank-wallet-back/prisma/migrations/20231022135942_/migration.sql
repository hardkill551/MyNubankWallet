/*
  Warnings:

  - You are about to drop the column `billsSummaryListUrl` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `featuresMap` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `listCardsUrl` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `bills_summary_list` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `features_map` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `list_cards` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "billsSummaryListUrl",
DROP COLUMN "featuresMap",
DROP COLUMN "listCardsUrl",
ADD COLUMN     "bills_summary_list" TEXT NOT NULL,
ADD COLUMN     "features_map" TEXT NOT NULL,
ADD COLUMN     "list_cards" TEXT NOT NULL;
