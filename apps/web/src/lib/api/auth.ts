import axios from "axios"

interface LoginResponse {
  access_token: string
}

const AuthAPI = {
  login: async (email: string, password: string) => {
    return axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
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
