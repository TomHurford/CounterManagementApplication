-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "forename" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "password" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counter" (
    "id" TEXT NOT NULL,
    "counterName" TEXT NOT NULL,
    "counterValue" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,

    CONSTRAINT "counter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "counter_id_key" ON "counter"("id");

-- AddForeignKey
ALTER TABLE "counter" ADD CONSTRAINT "counter_user_fkey" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
