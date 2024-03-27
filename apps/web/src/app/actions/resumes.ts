"use server"

import { redirect } from "next/navigation"

import ResumesAPI from "@/lib/api/resumes"
import { Resume } from "@/types/api/resumes"

export const createResume = async (userId: string) => {
  const res = await ResumesAPI.createResume(userId)

  redirect(`/resumes/${res.data.id}/edit`)
}

export const updateResume = async (resumeId: string, resume: Resume) => {
  try {
    const res = await ResumesAPI.updateResume(resumeId, resume)

    return res.data
  } catch (error) {
    return error
  }
}
