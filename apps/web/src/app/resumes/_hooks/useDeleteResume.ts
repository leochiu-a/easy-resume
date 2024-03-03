import { useState } from "react"

export const useDeleteResume = () => {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteResume = () => {
    setIsDeleting(true)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("deleted")
        setOpen(false)
        setIsDeleting(false)
      }, 1000)
    })
  }

  return {
    open,
    setOpen,
    deleteResume,
    isDeleting,
  }
}
