/*
  Warnings:

  - Added the required column `description` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authors" ADD COLUMN     "description" TEXT NOT NULL;
