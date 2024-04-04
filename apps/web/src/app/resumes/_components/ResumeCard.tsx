"use client"

import { useState, useTransition } from "react"
import {
  // faCopy,
  faDownload,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"
import Link from "next/link"

import { deleteResume } from "@/app/actions/resumes"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Resume } from "@/types/api/resumes"

interface ResumeCardProps {
  resume: Resume
}

const ResumeCard = ({ resume }: ResumeCardProps) => {
  const { id, resumeTitle, updatedAt } = resume
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [isDeleting, startTransition] = useTransition()

  const { toast } = useToast()

  const handleDeleteResume = () => {
    startTransition(async () => {
      const res = await deleteResume(id)
      toast({ title: `履歷「${res.resumeTitle}」已成功刪除` })
    })
  }

  return (
    <div className="flex gap-6">
      <div className="grid h-[270px] w-[192px] place-items-center rounded-md border">
        履歷快照 placeholder
      </div>

      <div className="flex flex-col">
        <div>{resumeTitle}</div>
        <small>更新於 {dayjs(updatedAt).format("YYYY-MM-DD HH:mm")}</small>
        <Button variant="ghost" className="mt-2 w-fit" asChild>
          <Link href={`/resumes/${id}/edit`}>
            <FontAwesomeIcon icon={faPenToSquare} className="mr-2 size-4" />
            編輯
          </Link>
        </Button>
        <Button variant="ghost" className="w-fit" asChild>
          <Link href={`/resumes/${id}`}>
            <FontAwesomeIcon icon={faEye} className="mr-2 size-4" />
            在線履歷
          </Link>
        </Button>
        <Button variant="ghost" className="w-fit">
          <FontAwesomeIcon icon={faDownload} className="mr-2 size-4" />
          下載 PDF
        </Button>
        {/* TODO: 之後再來新增複製功能 */}
        {/* <Button variant="ghost" className="w-fit">
          <FontAwesomeIcon icon={faCopy} className="mr-2 size-4" />
          複製
        </Button> */}

        <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-fit">
              <FontAwesomeIcon icon={faTrash} className="mr-2 size-4" />
              刪除
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>刪除履歷</DialogTitle>
              <DialogDescription>
                確定要刪除履歷嗎？一旦刪除將無法復原。
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleDeleteResume}
                loading={isDeleting}
              >
                刪除
              </Button>
              <DialogClose asChild>
                <Button>取消</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export { ResumeCard }
