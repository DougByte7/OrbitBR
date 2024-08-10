-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "authors" TEXT[],
    "genres" TEXT[],
    "streamingAt" TEXT NOT NULL,
    "streamingUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Anime_title_idx" ON "Anime"("title");
