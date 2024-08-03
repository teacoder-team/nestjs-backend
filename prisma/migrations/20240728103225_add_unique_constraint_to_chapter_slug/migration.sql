/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chapter_slug_key" ON "chapter"("slug");
