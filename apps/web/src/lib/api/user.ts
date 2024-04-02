import { axiosApiInstance } from "./common"

export interface Me {
  id: string
  name: string
  email: string
}

const UserAPI = {
  me: async () => {
    const res = await axiosApiInstance.get<Me>("/users/me")
    return res.data
  },
}

export { UserAPI }
