/*
  Warnings:

  - You are about to drop the column `video_url` on the `chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chapter" DROP COLUMN "video_url",
ADD COLUMN     "video_id" TEXT;
