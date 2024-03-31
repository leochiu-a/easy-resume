"use server"

import { UploadAPI } from "@/lib/api/upload"

export const uploadAvatar = async (data: FormData) => {
  try {
    const res = await UploadAPI.uploadImage(data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
