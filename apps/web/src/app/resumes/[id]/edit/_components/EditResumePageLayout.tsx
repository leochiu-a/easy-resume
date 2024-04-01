"use client"
import { KeyboardEvent, useTransition } from "react"
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
  loading: boolean
}

const SaveButton = ({ loading }: SaveButtonProps) => {
  return (
    <Button
      loading={loading}
      disabled={loading}
      type="submit"
      form="resume-form"
    >
      <FontAwesomeIcon icon={faSave} className="mr-2" />
      儲存
    </Button>
  )
}

interface EditResumePageLayoutProps {
  resume: Resume
}

const EditResumePageLayout = ({ resume }: EditResumePageLayoutProps) => {
  const [isPending, startTransition] = useTransition()

  const formMethods = useForm<Resume>({
    defaultValues: resume,
  })
  const { trigger, getValues } = formMethods

  const submitAction = async () => {
    const valid = await trigger()
    if (valid) {
      startTransition(() => {
        updateResume(resume.id, getValues())
      })
    }
  }

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") e.preventDefault()
  }

  return (
    <>
      <nav className="flex bg-slate-600 px-10 py-2">
        <Button variant="link" className="text-white" asChild>
          <Link href="/resumes">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            回到我的履歷
          </Link>
        </Button>

        <div className="ml-auto flex gap-4">
          <SaveButton loading={isPending} />
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
        <FormProvider {...formMethods}>
          <form action={submitAction} onKeyDown={checkKeyDown} id="resume-form">
            <ResumeForm />
          </form>
        </FormProvider>
      </main>
    </>
  )
}

export default EditResumePageLayout
