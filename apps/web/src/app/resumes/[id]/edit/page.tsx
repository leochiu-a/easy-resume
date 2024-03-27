import ResumesAPI from "@/lib/api/resumes"

import EditResumePageLayout from "./_components/EditResumePageLayout"

/**
 * 編輯履歷頁
 */
export default async function EditResumePage(props: {
  params: { id: string }
}) {
  const { id } = props.params

  const res = await ResumesAPI.getResume(id)
  const resume = res.data

  return <EditResumePageLayout resume={resume} />
}
