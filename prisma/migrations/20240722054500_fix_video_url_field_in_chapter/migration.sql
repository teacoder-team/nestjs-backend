/*
  Warnings:

  - You are about to drop the column `vider_url` on the `chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "vider_url",
ADD COLUMN     "video_url" TEXT;
