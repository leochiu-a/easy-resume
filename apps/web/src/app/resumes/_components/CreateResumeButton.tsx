"use client"

import { useTransition } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { createResume } from "@/app/actions/resumes"
import { Button } from "@/components/ui/button"

interface CreateResumeButtonProps {
  userId: string
}

const CreateResumeButton = ({ userId }: CreateResumeButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const handleCreateResume = () => {
    startTransition(() => {
      createResume(userId)
    })
  }

  return (
    <Button onClick={handleCreateResume} loading={isPending}>
      <FontAwesomeIcon icon={faPlus} className="mr-2 size-4" />
      創建履歷
    </Button>
  )
}

export { CreateResumeButton }
