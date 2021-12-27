-- CreateTable
CREATE TABLE "Password" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("id")
);
