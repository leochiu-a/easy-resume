"use server"

import ResumesAPI from "@/lib/api/resumes"
import { Resume } from "@/types/api/resumes"

export const updateResume = async (resumeId: string, resume: Resume) => {
  try {
    const res = await ResumesAPI.updateResume(resumeId, resume)

    return res.data
  } catch (error) {
    return error
  }
}
