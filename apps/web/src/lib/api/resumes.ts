import { Resume } from "@/types/api/resumes"

import { axiosApiInstance } from "./common"

const ResumesAPI = {
  getResumes: async () => {
    const res = await axiosApiInstance.get<Resume[]>(`/resumes`)
    return res.data
  },
  getResume: async (id: string) => {
    return axiosApiInstance.get<Resume>(`/resumes/${id}`)
  },
  createResume: async (userId: string) => {
    return axiosApiInstance.post<Resume>(`/resumes`, { userId })
  },
  updateResume: async (id: string, resume: Resume) => {
    return axiosApiInstance.patch<Resume>(`/resumes/${id}`, resume)
  },
  deleteResume: async (id: string) => {
    return axiosApiInstance.delete(`/resumes/${id}`)
  },
}

export default ResumesAPI
