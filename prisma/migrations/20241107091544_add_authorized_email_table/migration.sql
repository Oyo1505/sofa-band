-- CreateTable
CREATE TABLE "AuthorizedEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "AuthorizedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedEmail_email_key" ON "AuthorizedEmail"("email");
