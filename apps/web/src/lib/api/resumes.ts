import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { Resume } from "@/types/api/resumes"

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

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      redirect("/api/delete-access-token")
    } else if (error.response?.status === 404) {
      redirect("/not-found")
    }

    return Promise.reject(error)
  },
)

const ResumesAPI = {
  getResumes: async () => {
    return axiosApiInstance.get<Resume[]>(`${BASE_URL}/resumes`)
  },
  getResume: async (id: string) => {
    return axiosApiInstance.get<Resume>(`${BASE_URL}/resumes/${id}`)
  },
}

export default ResumesAPI
