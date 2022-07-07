-- CreateTable
CREATE TABLE "cont_emails" (
    "id" TEXT NOT NULL,
    "count" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cont_emails_pkey" PRIMARY KEY ("id")
);
