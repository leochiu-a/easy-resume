import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

interface LoginResponse {
  access_token: string
}

const AuthAPI = {
  login: async (email: string, password: string) => {
    return axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
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
