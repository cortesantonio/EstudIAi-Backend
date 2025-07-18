/*
  Warnings:

  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - Added the required column `documentId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_documentId_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "documentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "documentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
