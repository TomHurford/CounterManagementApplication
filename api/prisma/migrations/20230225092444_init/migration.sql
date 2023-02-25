/*
  Warnings:

  - Added the required column `dateCreated` to the `Counter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateUpdated` to the `Counter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Counter" ADD COLUMN     "dateCreated" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateUpdated" TIMESTAMP(3) NOT NULL;
