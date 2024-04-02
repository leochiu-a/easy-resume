import {
  faFacebook,
  faGithub,
  faLinkedin,
  faMedium,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons"
import {
  faBlog,
  faBoxArchive,
  faBriefcase,
  faCertificate,
  faGraduationCap,
  faUser,
  faWrench,
} from "@fortawesome/free-solid-svg-icons"

import { GroupType } from "@/types/api/resumes"

const { EmploymentHistory, Skills, Education } = GroupType

const socialIconMap: Record<string, IconDefinition> = {
  medium: faMedium,
  linkedin: faLinkedin,
  facebook: faFacebook,
  twitter: faTwitter,
  github: faGithub,
}

const socialMediaIcon = (key: string) => {
  const inCaseSensitive = key.toLowerCase()

  if (inCaseSensitive in socialIconMap) {
    return socialIconMap[inCaseSensitive]
  }

  return faBlog
}

const groupIconMap: Record<string, IconDefinition> = {
  intro: faUser,
  [EmploymentHistory]: faBriefcase,
  [Skills]: faWrench,
  [Education]: faGraduationCap,
  project: faBoxArchive,
  certification: faCertificate,
}

const groupIcon = (key: string) => {
  if (key in groupIconMap) {
    return groupIconMap[key]
  }

  return faBoxArchive
}

export { groupIcon, socialMediaIcon }
