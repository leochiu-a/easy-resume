import axios from "axios"
import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

const axiosApiInstance = axios.create({
  url: BASE_URL,
  withCredentials: true,
})

axiosApiInstance.interceptors.request.use(async (config) => {
  const accessToken = cookies().get("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.value}`
  }
  config.headers.Accept = "application/json"
  config.headers["Content-Type"] = "application/json"

  return config
})

export interface Resume {
  id: string
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
}

const ResumesAPI = {
  getResumes: async () => {
    return axiosApiInstance.get<Resume[]>(`${BASE_URL}/resumes`)
  },
}

export default ResumesAPI
