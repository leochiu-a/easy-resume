-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "resumeTitle" TEXT NOT NULL,
    "wantedJob" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "intro" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_resumeTitle_key" ON "Resume"("resumeTitle");
