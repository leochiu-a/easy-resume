import React from "react"

import { Typography } from "@/components/ui/typography"
import { useFormValues } from "@/hooks/useFormValues"

import { ComplexResumeSection, Resume, SimpleResumeSection } from "../page"

const isSimpleResumeSection = (
  field: SimpleResumeSection | ComplexResumeSection,
): field is SimpleResumeSection => {
  return "field" in field
}

const ResumePreviewer = () => {
  const {
    resumeTitle,
    wantedJobTitle,
    username,
    avatarUrl,
    city,
    phone,
    email,
    socialLinks,
    resumeSections,
  } = useFormValues<Resume>()

  return (
    <div>
      <div>resumeTitle: {resumeTitle}</div>
      <div>wantedJobTitle: {wantedJobTitle}</div>
      <div>username: {username}</div>
      <div>avatarUrl: {avatarUrl}</div>
      <div>city: {city}</div>
      <div>phone: {phone}</div>
      <div>email: {email}</div>

      <div className="mt-4">
        Website & Social links
        {socialLinks.map((link, index) => (
          <div key={index}>
            <span>label: {link.label} </span>
            <span>url: {link.url}</span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        Resume Sections
        {resumeSections.map((section, index) => (
          <div key={index}>
            <Typography variant="h3">
              title: {section.title} {section.fields?.length}{" "}
            </Typography>
            <span>sectionType: {section.sectionType}</span>
            <span>variant: {section.variant}</span>

            <div>
              {section.fields?.map((field, index) => (
                <div key={index}>
                  {isSimpleResumeSection(field) ? (
                    <div>{field.field}</div>
                  ) : (
                    <div>
                      <div>{field.field1}</div>
                      <div>{field.field2}</div>
                      <div>{field.field3}</div>
                      <div>{field.timeline?.from}</div>
                      <div>{field.timeline?.to}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumePreviewer
