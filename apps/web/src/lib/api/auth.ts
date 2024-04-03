import axios from "axios"

const axiosApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

interface LoginResponse {
  access_token: string
}

const AuthAPI = {
  login: async (email: string, password: string) => {
    return axiosApiInstance.post<LoginResponse>(
      "/auth/login",
      JSON.stringify({ email, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  },
}

export default AuthAPI
