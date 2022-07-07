/*
  Warnings:

  - You are about to drop the column `count` on the `cont_emails` table. All the data in the column will be lost.
  - Added the required column `from` to the `cont_emails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cont_emails" DROP COLUMN "count",
ADD COLUMN     "from" TEXT NOT NULL;
