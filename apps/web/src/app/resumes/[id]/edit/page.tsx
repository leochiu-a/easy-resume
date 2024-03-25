import ResumesAPI from "@/lib/api/resumes"

import { ResumeForm } from "./_components/ResumeForm"

/**
 * 編輯履歷頁
 */
export default async function EditResumePage(props: {
  params: { id: string }
}) {
  const { id } = props.params

  const res = await ResumesAPI.getResume(id)
  const resume = res.data

  return <ResumeForm resume={resume} />
}
