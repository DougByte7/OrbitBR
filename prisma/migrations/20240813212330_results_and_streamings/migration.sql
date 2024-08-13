/*
  Warnings:

  - You are about to drop the column `streamingAt` on the `Anime` table. All the data in the column will be lost.
  - The `streamingUrl` column on the `Anime` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "streamingAt",
DROP COLUMN "streamingUrl",
ADD COLUMN     "streamingUrl" TEXT[];

-- CreateTable
CREATE TABLE "TodayGameResults" (
    "animeId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TodayGameResults_animeId_key" ON "TodayGameResults"("animeId");

-- AddForeignKey
ALTER TABLE "TodayGameResults" ADD CONSTRAINT "TodayGameResults_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
