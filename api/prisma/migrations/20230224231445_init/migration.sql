/*
  Warnings:

  - The primary key for the `Counter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Counter` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Counter" DROP CONSTRAINT "Counter_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Counter_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Counter_id_key" ON "Counter"("id");
