-- AlterTable
ALTER TABLE "users" ALTER COLUMN "emailVerifiedAt" DROP NOT NULL,
ALTER COLUMN "hashRefreshToken" DROP NOT NULL;
