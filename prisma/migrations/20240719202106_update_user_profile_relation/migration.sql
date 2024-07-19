/*
  Warnings:

  - You are about to drop the column `user_id` on the `profile` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
