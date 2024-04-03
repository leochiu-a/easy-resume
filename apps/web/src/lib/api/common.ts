import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

axiosApiInstance.interceptors.request.use(async (config) => {
  const accessToken = cookies().get("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.value}`
  }
  config.headers.Accept = "application/json"

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
