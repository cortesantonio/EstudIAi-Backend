/*
  Warnings:

  - Added the required column `explanation` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionText` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "explanation" TEXT NOT NULL,
ADD COLUMN     "questionText" TEXT NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
