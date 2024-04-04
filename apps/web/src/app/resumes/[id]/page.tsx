import BasicTemplate from "@/components/resume-templates/BasicTemplate"
import ResumesAPI from "@/lib/api/resumes"

interface PreviewResumeProps {
  params: {
    id: string
  }
}

/**
 * 瀏覽履歷
 */
export default async function PreviewResumePage({
  params: { id },
}: PreviewResumeProps) {
  const res = await ResumesAPI.getResume(id)
  const {
    wantedJob,
    username,
    intro,
    avatarUrl,
    city,
    phone,
    email,
    socialLinks,
    groups,
  } = res.data

  return (
    <div className="bg-gray-200">
      <div className="flex justify-center py-12">
        <BasicTemplate
          avatarUrl={avatarUrl}
          city={city}
          email={email}
          intro={intro}
          phone={phone}
          groups={groups}
          socialLinks={socialLinks}
          username={username}
          wantedJob={wantedJob}
        />
      </div>
    </div>
  )
}
