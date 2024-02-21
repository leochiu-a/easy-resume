import { ChangeEvent, FC, useState } from "react"
import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UploadImageProps {
  onChange?: (avatarUrl: string) => void
  /** avatar url */
  value?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const uploadImage = (file: File) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("https://github.com/shadcn.png")
    }, 1000)
  })
}

const UploadImage: FC<UploadImageProps> = ({ onChange, value }) => {
  const [previewFile, setPreviewFile] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(e.target.files[0]).then((url) => {
        onChange?.(url)
      })
      setPreviewFile(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <>
      {value || previewFile ? (
        <Avatar>
          <AvatarImage src={value || previewFile} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <>
          <label
            className="group flex cursor-pointer items-center gap-4 [&>*]:transition [&>*]:duration-300"
            htmlFor="file"
          >
            <div className="flex size-[4rem] items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-600">
              <User size={40} />
            </div>
            <span className="group-hover:text-sky-600">上傳頭像</span>
          </label>
          <input type="file" id="file" onChange={handleChange} hidden />
        </>
      )}
    </>
  )
}

export { UploadImage }
