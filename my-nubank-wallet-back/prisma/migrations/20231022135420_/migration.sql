/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "listCardsUrl" TEXT NOT NULL,
    "billsSummaryListUrl" TEXT NOT NULL,
    "common_xp" TEXT NOT NULL,
    "featuresMap" TEXT NOT NULL,
    "bills_summary" TEXT NOT NULL,
    "foundation_tokens" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "app_flows" TEXT NOT NULL,
    "customer_sessions" TEXT NOT NULL,
    "userinfo" TEXT NOT NULL,
    "events" TEXT NOT NULL,
    "events_page" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);
