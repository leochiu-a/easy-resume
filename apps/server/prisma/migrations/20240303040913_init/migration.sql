-- DropIndex
DROP INDEX "Resume_resumeTitle_key";

-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "resumeTitle" DROP NOT NULL,
ALTER COLUMN "resumeTitle" SET DEFAULT '我的履歷';
