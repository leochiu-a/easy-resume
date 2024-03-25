/*
  Warnings:

  - Added the required column `layout` to the `ResumeGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupLayout" AS ENUM ('Simple', 'Complex');

-- AlterTable
ALTER TABLE "GroupField" ALTER COLUMN "field1" SET DEFAULT '',
ALTER COLUMN "field2" SET DEFAULT '',
ALTER COLUMN "field3" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "ResumeGroup" ADD COLUMN     "layout" "GroupLayout" NOT NULL;
