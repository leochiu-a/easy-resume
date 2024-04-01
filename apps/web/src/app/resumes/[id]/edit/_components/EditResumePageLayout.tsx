"use client"

import { KeyboardEvent, useRef, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useReactToPrint } from "react-to-print"
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
import ResumePreviewer from "./ResumePreviewer"

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
  const componentRef = useRef<HTMLDivElement>(null)

  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
  })

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
          <Button variant="secondary" onClick={handleDownload}>
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            下載 PDF
          </Button>
        </div>
      </nav>

      <main>
        <FormProvider {...formMethods}>
          <form action={submitAction} onKeyDown={checkKeyDown} id="resume-form">
            <div className="flex">
              <div className="w-1/2 p-12">
                <ResumeForm />
              </div>
              <div className="sticky top-0 h-screen w-1/2 overflow-auto bg-slate-200">
                <div className="m-8 overflow-hidden rounded-lg">
                  <ResumePreviewer ref={componentRef} />
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  )
}

export default EditResumePageLayout
