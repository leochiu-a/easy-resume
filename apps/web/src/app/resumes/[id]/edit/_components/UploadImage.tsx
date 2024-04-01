"use client"

import { ChangeEvent, FC, useRef, useState, useTransition } from "react"
import {
  faPencil,
  faSpinner,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { uploadAvatar } from "@/app/actions/upload"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface UploadImageProps {
  onChange?: (avatarUrl: string) => void
  /** avatar url */
  value?: string
}

const UploadImage: FC<UploadImageProps> = ({ onChange, value }) => {
  const [previewFile, setPreviewFile] = useState<string>()
  const [pending, startTransition] = useTransition()
  const ref = useRef<HTMLInputElement>(null)

  const handleReset = () => {
    if (ref.current) {
      ref.current.files = null
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const data = new FormData()
      data.append("file", file)

      startTransition(async () => {
        const res = await uploadAvatar(data)

        if (res?.path) {
          onChange?.(res?.path)
        }
        setPreviewFile(URL.createObjectURL(file))
        // 上傳完之後清除 input
        handleReset()
      })
    }
  }

  const handleDeleteAvatar = () => {
    setPreviewFile(undefined)
    onChange?.("")
  }

  return (
    <>
      {previewFile || value ? (
        <div className="flex items-center gap-4">
          <div className="flex size-[4rem] items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-600">
            <Avatar>
              <AvatarImage src={previewFile || value} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <Button variant="ghost" size="sm" type="button" asChild>
            <label htmlFor="file" className="cursor-pointer">
              <FontAwesomeIcon icon={faPencil} className="mr-2" />
              重新上傳
            </label>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={handleDeleteAvatar}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            刪除頭像
          </Button>
        </div>
      ) : (
        <label
          className="group flex cursor-pointer items-center gap-4 [&>*]:transition [&>*]:duration-300"
          htmlFor="file"
        >
          <div className="flex size-[4rem] items-center justify-center bg-gray-100 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-600">
            {pending ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="size-8 animate-spin"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} className="size-8" />
            )}
          </div>
          <span className="group-hover:text-sky-600">上傳頭像</span>
        </label>
      )}

      <input
        type="file"
        id="file"
        onChange={handleChange}
        hidden
        accept="image/png, image/jpeg"
        ref={ref}
      />
    </>
  )
}

export { UploadImage }
