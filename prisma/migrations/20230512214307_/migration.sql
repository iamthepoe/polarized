/*
  Warnings:

  - Added the required column `source` to the `phrases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phrases" ADD COLUMN     "source" TEXT NOT NULL;
