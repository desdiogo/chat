/*
  Warnings:

  - Added the required column `emailVerifiedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashRefreshToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hashRefreshToken" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
