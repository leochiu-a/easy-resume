import BasicTemplate from "@/components/resume-templates/BasicTemplate"
import { useFormValues } from "@/hooks/useFormValues"
import { Resume } from "@/types/api/resumes"

const ResumePreviewer = () => {
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
  } = useFormValues<Resume>()

  return (
    <div>
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
  )
}

export default ResumePreviewer
