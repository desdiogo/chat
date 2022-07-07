/*
  Warnings:

  - You are about to drop the `cont_emails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cont_emails";

-- CreateTable
CREATE TABLE "mails" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mails_pkey" PRIMARY KEY ("id")
);
