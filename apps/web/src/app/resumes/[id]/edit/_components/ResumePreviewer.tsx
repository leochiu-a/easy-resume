import { forwardRef } from "react"

import BasicTemplate from "@/components/resume-templates/BasicTemplate"
import { useFormValues } from "@/hooks/useFormValues"
import { Resume } from "@/types/api/resumes"

const ResumePreviewer = forwardRef<HTMLDivElement>((_, ref) => {
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
      ref={ref}
    />
  )
})

ResumePreviewer.displayName = "ResumePreviewer"

export default ResumePreviewer
