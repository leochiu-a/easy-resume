"use client"
import { KeyboardEvent, MouseEvent, useRef } from "react"
import { useFormStatus } from "react-dom"
import { FormProvider, useForm } from "react-hook-form"
import {
  faChevronLeft,
  faCrown,
  faFilePdf,
  faSave,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

import { updateResume } from "@/app/actions/resumes"
import { Button } from "@/components/ui/button"
import { Resume } from "@/types/api/resumes"

import { ResumeForm } from "./ResumeForm"

interface SaveButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const SaveButton = ({ onClick }: SaveButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} onClick={onClick} disabled={pending}>
      <FontAwesomeIcon icon={faSave} className="mr-2" />
      儲存
    </Button>
  )
}

interface EditResumePageLayoutProps {
  resume: Resume
}

const EditResumePageLayout = ({ resume }: EditResumePageLayoutProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const formMethods = useForm<Resume>({
    defaultValues: resume,
  })
  const { trigger, getValues } = formMethods

  const handleClickSaveButton = () => {
    formRef.current?.requestSubmit()
  }

  const submitAction = async () => {
    const valid = await trigger()
    if (valid) {
      updateResume(resume.id, getValues())
    }
  }

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault()
  }

  return (
    <FormProvider {...formMethods}>
      <form ref={formRef} action={submitAction} onKeyDown={checkKeyDown}>
        <nav className="flex bg-slate-600 px-10 py-2">
          <Button variant="link" className="text-white" asChild>
            <Link href="/resumes">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              回到我的履歷
            </Link>
          </Button>

          <div className="ml-auto flex gap-4">
            <SaveButton onClick={handleClickSaveButton} />
            <Button variant="secondary">
              <FontAwesomeIcon icon={faCrown} className="mr-2" />
              升級使用更多模板
            </Button>
            <Button variant="secondary">
              <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
              下載 PDF
            </Button>
          </div>
        </nav>

        <main>
          <ResumeForm resume={resume} />
        </main>
      </form>
    </FormProvider>
  )
}

export default EditResumePageLayout
