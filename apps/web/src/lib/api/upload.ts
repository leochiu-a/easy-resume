import { axiosApiInstance } from "./common"

interface UploadImageResponse {
  path: string
}

const UploadAPI = {
  uploadImage: async (data: FormData) => {
    return axiosApiInstance.post<UploadImageResponse>("/upload/image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

export { UploadAPI }
