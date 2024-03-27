import { Typography } from "@/components/ui/typography"
import HeaderLayout from "@/layouts/HeaderLayout"
import ResumesAPI from "@/lib/api/resumes"
import { UserAPI } from "@/lib/api/user"

import { CreateResumeButton } from "./_components/CreateResumeButton"
import { ResumeCard } from "./_components/ResumeCard"

/**
 * 管理我的履歷
 */
export default async function Resumes() {
  const resumeRes = ResumesAPI.getResumes()
  const userRes = UserAPI.me()

  const [resumes, user] = await Promise.all([resumeRes, userRes])

  return (
    <HeaderLayout>
      <div className="mt-6 h-screen">
        <div className="flex justify-between">
          <Typography variant="h3">我的履歷</Typography>
          <CreateResumeButton userId={user.id} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-y-10">
          {resumes.map((resume) => (
            <ResumeCard resume={resume} key={resume.id} />
          ))}
        </div>
      </div>
    </HeaderLayout>
  )
}
