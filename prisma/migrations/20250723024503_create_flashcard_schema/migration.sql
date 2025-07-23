-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Flashcards" (
    "id" SERIAL NOT NULL,
    "studyGroupId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Flashcards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flashcards" ADD CONSTRAINT "Flashcards_studyGroupId_fkey" FOREIGN KEY ("studyGroupId") REFERENCES "StudyGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
