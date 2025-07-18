/*
  Warnings:

  - You are about to drop the column `documentId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `description` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_documentId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "documentId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
