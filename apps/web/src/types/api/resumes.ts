interface SocialLink {
  name: string
  url: string
}

export enum GroupType {
  EmploymentHistory = "EmploymentHistory",
  Skills = "Skills",
  Education = "Education",
  Custom = "Custom",
}

export enum GroupLayout {
  Simple = "Simple",
  Complex = "Complex",
}

interface Timeline {
  from: string | null
  to: string | null
}

export interface Field {
  field1: string
  field2: string
  field3: string
  timeline: Timeline
  description: string
}

interface Group {
  id: string
  title: string
  type: GroupType
  resumeId: string
  fields: Field[]
  layout: GroupLayout
}

export interface Resume {
  id: string
  username: string
  resumeTitle: string
  wantedJob: string
  avatarUrl: string
  city: string
  phone: string
  email: string
  intro: string
  userId: string
  createAt: string
  updatedAt: string
  socialLinks: SocialLink[]
  groups: Group[]
}
