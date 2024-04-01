-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('EmploymentHistory', 'Skills', 'Education', 'Custom');

-- CreateTable
CREATE TABLE "ResumeGroup" (
    "id" TEXT NOT NULL,
    "type" "GroupType" NOT NULL,
    "title" TEXT NOT NULL,
    "resumeId" TEXT,

    CONSTRAINT "ResumeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupField" (
    "id" TEXT NOT NULL,
    "field1" TEXT,
    "field2" TEXT,
    "field3" TEXT,
    "resumeGroupId" TEXT,
    "description" TEXT,

    CONSTRAINT "GroupField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" TEXT NOT NULL,
    "from" TIMESTAMP(3),
    "to" TIMESTAMP(3),
    "groupFieldId" TEXT NOT NULL,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timeline_groupFieldId_key" ON "Timeline"("groupFieldId");

-- AddForeignKey
ALTER TABLE "ResumeGroup" ADD CONSTRAINT "ResumeGroup_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupField" ADD CONSTRAINT "GroupField_resumeGroupId_fkey" FOREIGN KEY ("resumeGroupId") REFERENCES "ResumeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_groupFieldId_fkey" FOREIGN KEY ("groupFieldId") REFERENCES "GroupField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
