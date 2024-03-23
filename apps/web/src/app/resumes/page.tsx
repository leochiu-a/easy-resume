import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import HeaderLayout from "@/layouts/HeaderLayout"
import ResumesAPI from "@/lib/api/resumes"

import { ResumeCard } from "./_components/ResumeCard"

/**
 * 管理我的履歷
 */
export default async function Resumes() {
  const res = await ResumesAPI.getResumes()
  const resumes = res.data

  return (
    <HeaderLayout>
      <div className="mt-6 h-screen">
        <div className="flex justify-between">
          <Typography variant="h3">我的履歷</Typography>
          <Button>
            <FontAwesomeIcon icon={faPlus} className="mr-2 size-4" />
            創建履歷
          </Button>
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
