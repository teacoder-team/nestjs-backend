/*
  Warnings:

  - You are about to drop the column `profileId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_profileId_fkey";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "profileId";

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
