import React from "react"

import BasicTemplate from "@/components/resume-templates/BasicTemplate"
import { useFormValues } from "@/hooks/useFormValues"
import { Resume } from "@/types/resume"

const ResumePreviewer = () => {
  const {
    resumeTitle,
    wantedJobTitle,
    username,
    intro,
    avatarUrl,
    city,
    phone,
    email,
    socialLinks,
    resumeSections,
  } = useFormValues<Resume>()

  return (
    <div>
      <BasicTemplate
        avatarUrl={avatarUrl}
        city={city}
        email={email}
        intro={intro}
        phone={phone}
        resumeSections={resumeSections}
        resumeTitle={resumeTitle}
        socialLinks={socialLinks}
        username={username}
        wantedJobTitle={wantedJobTitle}
      />
    </div>
  )
}

export default ResumePreviewer
