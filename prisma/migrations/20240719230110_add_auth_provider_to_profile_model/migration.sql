/*
  Warnings:

  - Added the required column `provider` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'GITHUB', 'YANDEX', 'DISCORD');

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "provider" "AuthProvider" NOT NULL;
