interface SocialLink {
  label: string
  url: string
}

export enum SectionType {
  EmploymentHistory = "EmploymentHistory",
  Skills = "Skills",
  Education = "Education",
  Custom = "Custom",
}

export enum FieldVariants {
  ComplexFieldsSection = "ComplexFieldsSection",
  SimpleFieldsSection = "SimpleFieldsSection",
}

interface Timeline {
  from: string
  to: string | null
}

export interface SimpleResumeSection {
  field: string
  timeline: Timeline | null
  description: string
}

export interface ComplexResumeSection {
  field1: string
  field2: string
  field3: string
  timeline: Timeline | null
  description: string
}

interface Timeline {
  from: string
  to: string | null
}

export interface SimpleResumeSection {
  field: string
  timeline: Timeline | null
  description: string
}

export interface ComplexResumeSection {
  field1: string
  field2: string
  field3: string
  timeline: Timeline | null
  description: string
}

export interface ResumeSection {
  sectionType: SectionType
  variant: FieldVariants
  title: string
  fields: (SimpleResumeSection | ComplexResumeSection)[]
}

export interface Resume {
  resumeTitle: string
  wantedJobTitle: string
  username: string
  avatarUrl: string
  city: string
  phone: string
  email: string
  intro: string
  socialLinks: SocialLink[]
  resumeSections: ResumeSection[]
}
